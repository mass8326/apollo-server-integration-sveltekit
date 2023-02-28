import type { Resolvers } from "./.generated";
import { gql } from "graphql-tag";

export const typeDefs = gql`
	type Query {
		ping(payload: String): String!
		json: String!
	}
`;
export const resolvers: Resolvers = {
	Query: {
		ping: (_parent, args) => args.payload ?? "pong",
		json: (_parent, _args, context) => JSON.stringify(context.json),
	},
};
