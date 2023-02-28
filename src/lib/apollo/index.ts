import type { ApolloServer, BaseContext, ContextFunction } from "@apollo/server";
import type { WithRequired } from "@apollo/utils.withrequired";
import type { RequestHandler } from "@sveltejs/kit";
import { HeaderMap } from "@apollo/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultContext: ContextFunction<[], any> = async () => ({});
export type SvelteContextFunction<TContext extends BaseContext> = ContextFunction<
	Parameters<RequestHandler>,
	TContext
>;
export interface SvelteOptions<TContext extends BaseContext> {
	context?: SvelteContextFunction<TContext>;
}

export function startServerAndCreateSvelteHandler(
	server: ApolloServer<BaseContext>,
	options?: SvelteOptions<BaseContext>
): RequestHandler;
export function startServerAndCreateSvelteHandler<TContext extends BaseContext>(
	server: ApolloServer<TContext>,
	options: WithRequired<SvelteOptions<TContext>, "context">
): RequestHandler;
export function startServerAndCreateSvelteHandler<TContext extends BaseContext>(
	server: ApolloServer<TContext>,
	options?: SvelteOptions<TContext>
): RequestHandler {
	server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();
	const contextFunction = options?.context ?? defaultContext;
	const handler: RequestHandler = async (event) => {
		// Allow request to be consumed elsewhere (such as in context function)
		const request = event.request.clone();
		// Parse event
		const body = await request.json().catch(() => null);
		const headers = new HeaderMap();
		for (const [key, val] of event.request.headers) headers.set(key, val);
		// Execute gql request
		const result = await server.executeHTTPGraphQLRequest({
			context: () => contextFunction(event),
			httpGraphQLRequest: {
				body,
				headers,
				method: event.request.method || "POST",
				search: event.url.search,
			},
		});
		// Build response body
		let response = "";
		if (result.body.kind === "complete") response = result.body.string;
		else for await (const chunk of result.body.asyncIterator) response += chunk;
		// Return response
		return new Response(response, {
			status: result.status || 200,
			headers: Object.fromEntries(result.headers),
		});
	};
	return handler;
}
