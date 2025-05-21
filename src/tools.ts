import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

/**
 * Provides the MCP server's tools.
 */
export abstract class Tools {
	public static addAll(server: McpServer) {
		// add addition tool
		server.tool('add', { a: z.number(), b: z.number() }, ({ a, b }) => ({
			content: [{ type: 'text', text: String(a + b) }],
		}))

		// add subtraction tool
		server.tool('subtract', { a: z.number(), b: z.number() }, ({ a, b }) => ({
			content: [{ type: 'text', text: String(a - b) }],
		}))

		// add (dummy) weather tool
		server.tool('weather', { location: z.string() }, ({ location }) => ({
			content: [{ type: 'text', text: String(`Current wheater in ${location}: sunny, 26°`) }],
		}))
	}
}
