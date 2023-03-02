import type { Resolvers } from "./.generated";
import { gql } from "graphql-tag";

export const typeDefs = gql`
	type Query {
		ping(payload: String): String!
		text: String!
	}
`;
export const resolvers: Resolvers = {
	Query: {
		ping: (_parent, args) => args.payload ?? "pong",
		text: (_parent, _args, context) => context.text,
	},
};
