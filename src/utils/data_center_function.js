import axios from "axios";

let cachedDataCenters;
export async function getDataCenters() {
	if (cachedDataCenters != null) {
		return cachedDataCenters;
	}
	var res = await axios("https://universalis.app/api/v2/data-centers");
	cachedDataCenters = res.data;
	return cachedDataCenters;
}
