import axios from "axios";

export async function getItemHistory(item_id) {
	var res = await axios(
		`https://universalis.app/api/history/Materia/${item_id}?entries=1800`
	);
    return res.data
}
export async function getItemMarketData(item_id, dc = "Materia") {
	var res = await axios(
		`https://universalis.app/api/${dc}/${item_id}?entries=1800`
	);
    return res.data
}
export async function getXIVApiItem(item_id, columns = null){
	console.log(`getting https://xivapi.com/item/${item_id}?${columns != null ? `columns=${columns}` : ""}&private_key=038d7e10d1df4330b4f703da3d3c63e57d0f97bb58e4478590e15e580c3f470c`)
    
	var res = await axios(
		`https://xivapi.com/item/${item_id}?${columns != null ? `columns=${columns}` : ""}&private_key=038d7e10d1df4330b4f703da3d3c63e57d0f97bb58e4478590e15e580c3f470c`
	);
	return res.data
}