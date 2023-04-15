import {
	getHighestPriceItem,
	getItemNameByID,
	getLowestPriceItem,
} from "../../../utils/item_utils";
import marketable_item from "../../../data/marketable_items.json";
import { getItemMarketData } from "../../../utils/item_request";
import { filterArray } from "../../../utils/array_object";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	var market_data = await getItemMarketData(params.item_id);

	var hqList = filterArray(market_data.listings, { hq: true });
	var nqList = filterArray(market_data.listings, { hq: false });

	var hqLowest = getLowestPriceItem(hqList);
	var nqLowest = getLowestPriceItem(nqList);

	var hqHighest = getHighestPriceItem(hqList);
	var nqHighest = getHighestPriceItem(nqList);

	return {
		hqList,
		nqList,
		hqLowest,
		nqLowest,
		hqHighest,
		nqHighest,
		item_id: params.item_id,
		name: getItemNameByID(marketable_item, params.item_id),
	};
}