import { json } from "@sveltejs/kit";
import { convertToArray, filterItemJsonObjects } from "../../../utils/item_utils";
import { get } from "svelte/store";
import { marketable_items_json } from "../../../stores/server_stores";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { item_name, max_results } = await request.json();

	const filteredJson = filterItemJsonObjects(get(marketable_items_json), item_name, max_results)
	return json(convertToArray(filteredJson));
}
