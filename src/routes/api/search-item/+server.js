import { error, json } from "@sveltejs/kit";
import { convertToArray, filterItemJsonObjects } from "../../../utils/item_utils";
import items from "../../../data/marketable_items.json"

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { item_name, max_results } = await request.json();

	const filteredJson = filterItemJsonObjects(items, item_name, max_results)
	return json(convertToArray(filteredJson));
}
