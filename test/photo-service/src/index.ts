/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

/**
 * Import the Router class from itty-router
 * itty-router is a lightweight router that helps route HTTP requests based on path and method
 * It's specifically designed to be small and efficient for Cloudflare Workers
 */
import { Router } from 'itty-router';
import getImages from './handlers/get_images';
/**
 * Initialize a new Router instance
 * This creates a router that will match requests against defined routes
 */
const router = Router()

/**
 * Configure routes for the application
 * The router processes routes in order, so specific routes should come before catch-all routes
 * 
 * .get('/images', getImages) - Routes GET requests to /images to the getImages handler
 * 
 * .get('*', ...) - Wildcard route that catches any GET requests not matched by previous routes
 *                  Returns a 404 response with "Not found" message
 * 
 * Note: You can use wildcards in paths too, like '/images/*' which would match:
 * - /images/1
 * - /images/foo
 * - /images/foo/bar
 */
router.get('/images', getImages)
	.get('*', () => new Response('Not found', { status: 404 }));


export interface Env {
	// MY_KV_NAMESPACE: KVNamespace
}
/**
 * Every Cloudflare Worker must export a default module with methods 
 * that Cloudflare calls when your Worker receives a request.
 */
export default {
	/**
	 * The fetch function is called whenever an HTTP request is received by your Worker.
	 * 
	 * @param request - Represents the HTTP request received. Provides access to body, headers, and HTTP method.
	 *                  Based on the standard Fetch API with Cloudflare-specific enhancements.
	 * 
	 * @param env - Provides access to environment variables and Cloudflare services like:
	 *              - KV namespaces
	 *              - D1 databases
	 *              - R2 storage buckets
	 *              - Queues
	 *              - Secrets
	 * 
	 * @param ctx - The execution context, which provides methods to manage Worker behavior.
	 *              The waitUntil() method allows extending execution time after returning a response,
	 *              useful for background processing while still responding to the client quickly.
	 * 
	 * @returns A Response object from the Fetch API, containing the data to be sent back to the client.
	 */
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		//return new Response('Hello World!!!!');
		
		/**
		 * Let the router handle the request
		 * 
		 * router.fetch() will:
		 * 1. Analyze the incoming request (path, method, etc.)
		 * 2. Find the first matching route handler
		 * 3. Execute that handler and return its Response
		 * 4. If no routes match, it falls back to the wildcard handler (404 in this case)
		 */
		return router.fetch(request);
	},
};
