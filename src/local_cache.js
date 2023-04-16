// import { get } from "svelte/store";
// import { world_mapping_store } from "./stores/dc_world_stores";
// import { getArrayFromCSV } from "./utils/csv_functions";

// async function initWorldNameMapping() {
// 	if (get(world_mapping_store) != null) return;

// 	console.log("getting world mapping CSV data...");
// 	var world_name_m = await getArrayFromCSV("https://raw.githubusercontent.com/rajinzajin/ffxiv-data-csv/master/csv/World.csv")
// 	console.log("getting world mapping CSV data completed...");
// 	world_mapping_store.set(world_name_m);
// }
