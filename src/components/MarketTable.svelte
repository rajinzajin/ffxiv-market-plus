<script>
	import { get } from "svelte/store";
	import { main_dc } from "../stores/dc_world_stores";
	import { getDataCenter } from "../utils/data_center_function";
	import { formatNumberToGilString } from "../utils/format_function";
	import { getWorld } from "../utils/world_function";
	import { getLowestPriceItem } from "../utils/item_utils";

	export let listings = [];

	let worlds_listing = [];

	$: worlds_listing = updateData(listings);

	function updateData(_listings) {
		var result = [];
		if (_listings.length > 0) {
			var worlds = getDataCenter(get(main_dc)).worlds ?? [];
			worlds.forEach((world_id) => {
				var world = getWorld(world_id);
				var worlds_listings = getWorldListing(world.name);
				if (worlds_listings.length > 0) {
					result.push(getLowestPriceItem(worlds_listings));
				}
			});
			result.sort((a, b) => a.pricePerUnit - b.pricePerUnit);
		}
		return result;
	}

	function getWorldListing(worldName) {
		return listings.filter((listing) => listing.worldName === worldName);
	}
</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
	<table class="w-full font-display text-sm text-left text-gray-300">
		<thead
			class="bg-item text-sm font-body text-gray-700 uppercase dark:text-gray-400"
		>
			<tr>
				<th scope="col" class="px-6 py-3"> World </th>
				<th scope="col" class="px-6 py-3"> Price </th>
				<th scope="col" class="px-6 py-3"> Quantity </th>
				<th scope="col" class="px-6 py-3"> Quality </th>
			</tr>
		</thead>
		<tbody>
			{#each worlds_listing as world_listing}
				<tr
					class="bg-primary text-base border-b border-gray-700 hover:bg-gray-600"
				>
					<th
						scope="row"
						class="px-6 py-4 font-medium whitespace-nowrap text-white"
					>
						{world_listing.worldName}
					</th>
					<td class="px-6 py-4">
						{formatNumberToGilString(world_listing.pricePerUnit)}
					</td>
					<td class="px-6 py-4"> {world_listing.quantity} </td>
					<td class="px-6 py-4">
						{world_listing.hq === true ? "High" : "Normal"}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
