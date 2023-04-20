import { getWorlds } from "../utils/world_function";
import marketable_items from "../data/marketable_items.json" assert { type: "json" };

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	var worlds = await getWorlds();

	return {
		worlds,
		marketable_items,
	};
}
