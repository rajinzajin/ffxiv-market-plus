import csvParser from "csv-parser";
import { filterArray } from "./array_object.js";
import axios from "axios";
import { get } from "svelte/store";
import { item_csv } from "../stores/server_stores.js";

export async function processItemCSV() {
	const dataStream = await axios.get(
		"https://raw.githubusercontent.com/rajinzajin/ffxiv-data-csv/master/csv/Item.csv",
		{ responseType: "stream" }
	);

	return new Promise((resolve, reject) => {
		const results = [];
		dataStream.data
			.pipe(csvParser({ skipLines: 2, headers: false }))
			.on("data", (data) => {
				// Process each row of data here

				results.push(data);
			})
			.on("end", () => {
				// When the stream ends, store the results in the cache and resolve the promise
				resolve(results);
			})
			.on("error", (err) => {
				// If there's an error, reject the promise with the error
				reject(err);
			});
	});
}
export async function getItemDetailByID(id) {
	var data = get(item_csv)
	var itemDetail = filterArray(data, { 0: `${id}` });
	if (itemDetail.length > 0) {
		return itemDetail[0];
	}
	return null;
}
