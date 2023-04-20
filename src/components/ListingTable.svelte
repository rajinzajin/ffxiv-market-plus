<script>
	import axios from "axios";
  import { formatNumberToGilString } from "../utils/format_function";

	export let dc;
	export let item_id;

	let listings = [];

	if (dc != null && item_id != null) retrieveData();

	async function retrieveData() {
		var res = await axios(`https://universalis.app/api/v2/${dc}/${item_id}?listings=10`);
		listings = res.data.listings;
	}
</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
	<table class="w-full font-display text-sm text-left text-gray-400 ">
		<thead
			class="bg-item text-sm font-body text-gray-700 uppercase dark:text-gray-400"
		>
			<tr>
				<th scope="col" class="px-6 py-3"> Retainer name </th>
				<th scope="col" class="px-6 py-3"> Total </th>
				<th scope="col" class="px-6 py-3"> World </th>
				<th scope="col" class="px-6 py-3"> Price </th>
			</tr>
		</thead>
		<tbody>
			{#each listings as listing}
				<tr
					class="bg-primary text-base border-b  dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
				>
					<th
						scope="row"
						class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
					>
						{listing.retainerName}
					</th>
					<td class="px-6 py-4"> {listing.total} </td>
					<td class="px-6 py-4"> {listing.worldName} </td>
					<td class="px-6 py-4"> {formatNumberToGilString(listing.pricePerUnit)} </td>
					
				</tr>
			{/each}
		</tbody>
	</table>
</div>
