#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js'
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import { isInitializeRequest } from '@modelcontextprotocol/sdk/types.js'
import express from 'express'
import { randomUUID } from 'node:crypto'
import 'source-map-support/register.js'
import { Prompts } from './prompts.js'
import { Resources } from './resources.js'
import { Tools } from './tools.js'

// **************************************************************************************************************************************************
// **************************************************************************************************************************************************
// **************************************************************************************************************************************************

const server = new McpServer({
	name: 'test',
	version: '0.0.1',
})

Prompts.addAll(server)
Resources.addAll(server)
Tools.addAll(server)

// **************************************************************************************************************************************************
// **************************************************************************************************************************************************
// **************************************************************************************************************************************************

const app = express()
app.disable('x-powered-by')
app.use(express.json())

// Store transports for each session type
const transports = {
	streamable: {} as Record<string, StreamableHTTPServerTransport>,
	sse: {} as Record<string, SSEServerTransport>,
}

// Handle POST requests for client-to-server communication
app.post('/mcp', async (req, res) => {
	// Check for existing session ID
	const sessionId = req.headers['mcp-session-id'] as string | undefined
	let transport: StreamableHTTPServerTransport

	if (sessionId && transports[sessionId]) {
		// Reuse existing transport
		transport = transports[sessionId]
	} else if (!sessionId && isInitializeRequest(req.body)) {
		// New initialization request
		transport = new StreamableHTTPServerTransport({
			sessionIdGenerator: () => randomUUID(),
			onsessioninitialized: (sessionIdNoShadow) => {
				// Store the transport by session ID
				transports[sessionIdNoShadow] = transport
			},
		})

		// Clean up transport when closed
		transport.onclose = () => {
			if (transport.sessionId) {
				delete transports[transport.sessionId]
			}
		}

		// Connect to the MCP server
		await server.connect(transport)
	} else {
		// Invalid request
		res.status(400).json({
			jsonrpc: '2.0',
			error: {
				code: -32000,
				message: 'Bad Request: No valid session ID provided',
			},
			id: null,
		})
		return
	}

	// Handle the request
	await transport.handleRequest(req, res, req.body)
})

// Reusable handler for GET and DELETE requests
const handleSessionRequest = async (req: express.Request, res: express.Response) => {
	const sessionId = req.headers['mcp-session-id'] as string | undefined
	if (!sessionId || !transports[sessionId]) {
		res.status(400).send('Invalid or missing session ID')
		return
	}

	const transport = transports[sessionId]
	await transport.handleRequest(req, res)
}

// Handle GET requests for server-to-client notifications via SSE
app.get('/mcp', handleSessionRequest)

// Handle DELETE requests for session termination
app.delete('/mcp', handleSessionRequest)

// Legacy SSE endpoint for older clients
app.get('/sse', async (_req, res) => {
	// Create SSE transport for legacy clients
	const transport = new SSEServerTransport('/messages', res)
	transports.sse[transport.sessionId] = transport

	res.on('close', () => {
		delete transports.sse[transport.sessionId]
	})

	await server.connect(transport)
})

// Legacy message endpoint for older clients
app.post('/messages', async (req, res) => {
	const sessionId = req.query['sessionId'] as string
	const transport = transports.sse[sessionId]
	if (transport) {
		await transport.handlePostMessage(req, res, req.body)
	} else {
		res.status(400).send('No transport found for sessionId')
	}
})

// Start the server
const PORT = 3000
app.listen(PORT, () => {
	console.log(`MCP Stateless Streamable HTTP Server listening on port ${PORT}`)
})
