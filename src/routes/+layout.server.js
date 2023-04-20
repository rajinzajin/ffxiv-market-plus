import { getArrayFromCSV } from "../utils/csv_functions";
import { getDataCenters } from "../utils/data_center_function";
import { getWorlds } from "../utils/world_function";
import marketable_items from "../data/marketable_items.json" assert { type: "json" };

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	var data_centers = await getDataCenters();
	var worlds = await getWorlds();

	return {
		data_centers,
		worlds,
		marketable_items,
	};
}
