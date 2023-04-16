import { processItemCSV } from "./utils/item_csv_function";
import { get } from "svelte/store";
import { item_csv, marketable_items_json } from "./stores/server_stores";
import marketable_items from "./data/marketable_items.json";

export async function initCache() {
	await initItemCSV();
	await initMarketableItems();
	console.log("cache init finished...");
}

async function initMarketableItems() {
	if (get(marketable_items_json) != null) return;

	marketable_items_json.set(marketable_items);
}
async function initItemCSV() {
	if (get(item_csv) != null) return;

	console.log("getting item CSV data...");
	var itemCSV = await processItemCSV();
	console.log("getting item CSV data completed...");
	item_csv.set(itemCSV);
}
