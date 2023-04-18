import { json } from "@sveltejs/kit";
import { filterArray } from "../../../../../utils/array_object";
import { getItemMarketData } from "../../../../../utils/item_request";
import { getHighestPriceItem, getLowestPriceItem } from "../../../../../utils/item_utils";

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	var market_data = await getItemMarketData(params.item_id, params.dc);
    
	var hqList = filterArray(market_data.listings, { hq: true });
	var nqList = filterArray(market_data.listings, { hq: false });

	var hqLowest = getLowestPriceItem(hqList);
	var nqLowest = getLowestPriceItem(nqList);

	var hqHighest = getHighestPriceItem(hqList);
	var nqHighest = getHighestPriceItem(nqList);

    return json({nqLowest, nqHighest, hqLowest, hqHighest})
}