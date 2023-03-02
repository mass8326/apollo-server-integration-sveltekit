import type { SvelteContextFunction } from "$lib/apollo";

export type Context = { text: string; random: number };
export const context: SvelteContextFunction<Context> = async (event) => ({
	text: await event.request.text(),
	random: Math.random(),
});
