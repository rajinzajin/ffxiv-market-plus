import axios from "axios";
import { XIVAPI_KEY } from "$env/static/private"

export async function getXIVApiItem(item_id, columns = null){
	var res = await axios(
		`https://xivapi.com/item/${item_id}?${columns != null ? `columns=${columns}` : ""}&private_key=${XIVAPI_KEY}`
	);
	return res.data
}