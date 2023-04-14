import { getItemNameByID } from "../../../utils/item_utils";
import marketable_item from "../../../data/marketable_items.json";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	return {
		item_id: params.item_id,
		name: getItemNameByID(marketable_item, params.item_id),
	};
}
