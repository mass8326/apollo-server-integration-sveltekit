# apollo-server-integration-sveltekit

This integration is for Apollo Server 4 and has been made to mirror the official [Next.js integration](https://github.com/apollo-server-integrations/apollo-server-integration-next).

## Installation

Available through the [npm registry](https://www.npmjs.com/), use your preferred package manager to install.

```sh
$ npm i -D apollo-server-integration-sveltekit
```

## Getting Started

Create an `ApolloServer` instance and pass it to `startServerAndCreateSvelteHandler`. It will create a `RequestHandler` that you can export as a server route's `GET` and `POST` methods.

```js
// src/routes/+server.js

import { ApolloServer } from "@apollo/server";
import { startServerAndCreateSvelteHandler } from "apollo-server-integration-sveltekit";
import { resolvers, typeDefs, context } from "...";

const server = new ApolloServer({ resolvers, typeDefs });

const handler = startServerAndCreateSvelteHandler(server, { context });

export { handler as GET, handler as POST };
```

Types are available and may be used to help create a context function.

```ts
// src/server/context.ts

import type { SvelteContextFunction } from "apollo-server-integration-sveltekit";

export type Context = { text: string; random: number };
export const context: SvelteContextFunction<Context> = async (event) => ({
	text: await event.request.text(),
	random: Math.random(),
});
```

## Live Demo

This repository makes use of `svelte-package`. All code related to the published npm package is under `src/lib/apollo`.

The rest of the repository serves as an example website that is available here: https://apollo-server-integration-sveltekit.vercel.app/
