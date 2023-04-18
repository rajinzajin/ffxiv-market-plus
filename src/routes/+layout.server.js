import { initCache } from "../cache";
import { getArrayFromCSV } from "../utils/csv_functions";
import { getDataCenters } from "../utils/data_center_function";
import { getWorlds } from "../utils/world_function";
import marketable_items from "../data/marketable_items.json" assert { type: "json" };
import {getItem} from "../../prisma/item_db"
/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	await initCache();
	
	var data_centers = await getDataCenters();
	var worlds = await getWorlds();
	var world_mapping = await getArrayFromCSV(
		"https://raw.githubusercontent.com/rajinzajin/ffxiv-data-csv/master/csv/World.csv"
	);

	return {
		data_centers,
		worlds,
		world_mapping,
		marketable_items
	};
}
