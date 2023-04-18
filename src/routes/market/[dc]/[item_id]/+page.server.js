import { getItem } from "../../../../../prisma/item_db";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	var item_detail = await getItem(params.item_id)

	return {
		item_detail
	};
}
