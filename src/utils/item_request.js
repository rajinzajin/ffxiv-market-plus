import axios from "axios";

export async function getItemHistory(item_id) {
	var res = await axios(
		`https://universalis.app/api/history/Materia/${item_id}?entries=1800`
	);
    return res.data
}
export async function getItemMarketData(item_id) {
	var res = await axios(
		`https://universalis.app/api/Materia/${item_id}?entries=1800`
	);
    return res.data
}