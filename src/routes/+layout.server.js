import { getDataCenters } from "../utils/data_center_function";
import { getWorlds } from "../utils/world_function";

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	var data_centers = await getDataCenters();
    var worlds = await getWorlds();

    return {
        data_centers,
        worlds
    }
}
