import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { context } from "./context";
import { startServerAndCreateSvelteHandler } from "$lib/apollo";
import { resolvers, typeDefs } from "$lib/server/schema";

const server = new ApolloServer({
	cache: "bounded",
	typeDefs,
	resolvers,
	introspection: true,
	plugins: [ApolloServerPluginLandingPageLocalDefault()],
});
export const handler = startServerAndCreateSvelteHandler(server, { context });
