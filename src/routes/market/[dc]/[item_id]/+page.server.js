import { getXIVApiItem } from '../../../../utils/item_api_request';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

	var item = await getXIVApiItem(params.item_id, "ID,Name,Description");
	return {
		item,
		item_id: params.item_id,
	};
}
