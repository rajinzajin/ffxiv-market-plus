import { error, json } from "@sveltejs/kit";
import { convertToArray, filterItemJsonObjects } from "../../../utils/item_utils";
import items from "../../../data/items.json"

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { item_name } = await request.json();

	const filteredJson = filterItemJsonObjects(items, item_name)
	return json(convertToArray(filteredJson));
}
