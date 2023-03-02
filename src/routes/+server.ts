import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { startServerAndCreateSvelteHandler } from "$lib/apollo";
import { context } from "$lib/server/context";
import { resolvers, typeDefs } from "$lib/server/schema";

const server = new ApolloServer({
	cache: "bounded",
	typeDefs,
	resolvers,
	introspection: true,
	plugins: [ApolloServerPluginLandingPageLocalDefault()],
});
const handler = startServerAndCreateSvelteHandler(server, { context });

export { handler as GET, handler as POST };
