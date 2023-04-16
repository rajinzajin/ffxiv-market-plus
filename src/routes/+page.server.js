import axios from 'axios';

let cachedDataCenters;
/** @type {import('./$types').PageServerLoad} */
export async function load() {
	if(cachedDataCenters != null){
		return{
			"data_centers" : cachedDataCenters
		}
	}

	var res = await axios("https://universalis.app/api/v2/data-centers")
	cachedDataCenters = res.data
    return {
		"data_centers" : res.data,
	};
}
