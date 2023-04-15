import { json } from "@sveltejs/kit";
import { processItemCSV } from "../../../../utils/item_csv_function";
import { filterArray } from "../../../../utils/array_object";

/** @type {import('./$types').RequestHandler} */
export async function GET({ request, params }) {
	const results = await processItemCSV();

	return json(filterArray(results, { "#": `${params.item_id}` }));
}