/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

	return {
		data_center: params.dc,
		item_id: params.item_id
	};
}
