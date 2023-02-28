import type { SvelteContextFunction } from "$lib/apollo";
import type { RequestEvent } from "@sveltejs/kit";

export type Context = { json: string };
export const context: SvelteContextFunction<Context> = async (
	event: RequestEvent
): Promise<Context> => ({ json: await event.request.json() });
