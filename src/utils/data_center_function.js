import axios from "axios";
import { filterArray } from "./array_object.js";

export async function getDataCenters() {
	var res = await axios("https://universalis.app/api/v2/data-centers");
	return res.data;
}

export function getDataCenter(data_centers, name) {
	var filtered = filterArray(data_centers, { name });
	return filtered.length > 0 ? filtered[0] : null;
}
