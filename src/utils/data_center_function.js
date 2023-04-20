import { filterArray } from "./array_object.js";
import data_centers from "../data/data_centers.json" assert { type: "json" };

export function getDataCenters() {
	return data_centers;
}
export function getDataCenter(name){
	var filtered = filterArray(data_centers, { name });
	return filtered.length > 0 ? filtered[0] : null;
}
