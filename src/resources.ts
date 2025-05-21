import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js'

/**
 * Provides the MCP server's resources.
 */
export abstract class Resources {
	public static addAll(server: McpServer) {
		// add dynamic greeting resource
		// eslint-disable-next-line no-undefined
		server.resource('greeting', new ResourceTemplate('greeting://{name}', { list: undefined }), (uri, { name }) => ({
			contents: [
				{
					uri: uri.href,
					text: `Hello, ${name}!`,
				},
			],
		}))
	}
}
