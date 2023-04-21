import { json } from "@sveltejs/kit";
import { getItem } from "../../../../../prisma/item_db";

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    const item_detail = await getItem(params.item_id)
	return json(item_detail);
}