import axios from "axios";

export async function getItemHistory(item_id) {
	var res = await axios(
		`https://universalis.app/api/history/Materia/${item_id}?entries=1800`
	);
    return res.data
}
export async function getItemMarketData(item_id, dc = "Materia", fields="") {
	var res = await axios(
		`https://universalis.app/api/${dc}/${item_id}?entries=1800&fields=${fields}`
	);
    return res.data
}

export async function getMarketRecentUpdate(dc = "Materia") {
	var res = await axios(
		`https://universalis.app/api/v2/extra/stats/most-recently-updated?dcName=${dc}&entries=10`
	);
    return res.data
}