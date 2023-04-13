import { error, json } from "@sveltejs/kit";
import items from "../../../data/items.json";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { item_name } = await request.json();

	const filteredJson = {}

	Object.keys(items).forEach((key) => {
		if (items[key].en.toLowerCase().includes(item_name.toLowerCase())) {
			filteredJson[key] = items[key];
		}
	})

	return json(filteredJson);
}
