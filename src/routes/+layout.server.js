import { getDataCenters } from "../utils/data_center_function";

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	var data_centers = await getDataCenters();
    return {
        data_centers
    }
}
