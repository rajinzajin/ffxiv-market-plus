import { processItemCSV } from "./utils/item_csv_function";
import { get } from "svelte/store";
import { item_csv } from "./stores/server_stores";

export async function initCache() {
	if (get(item_csv) != null) return;

	console.log("getting item CSV data...");
	var itemCSV = await processItemCSV();
	console.log("getting item CSV data completed...");
	item_csv.set(itemCSV);
	console.log("cache init finished...");
}
