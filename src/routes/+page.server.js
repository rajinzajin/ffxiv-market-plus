import axios from 'axios';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	var res = await axios("https://universalis.app/api/v2/data-centers")
    return {
		"data_centers" : res.data,
	};
}
