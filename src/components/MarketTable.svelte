<script>
	import { get } from "svelte/store";
	import { main_dc } from "../stores/dc_world_stores";
	import { getDataCenter } from "../utils/data_center_function";
	import { formatNumberToGilString } from "../utils/format_function";
	import { getWorld } from "../utils/world_function";
	import { getLowestPriceItem } from "../utils/item_utils";

	export let listings = [];

	const selectedStyle =
		"text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800";
	const unSelectedStyle =
		"py-2.5 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none rounded-lg border focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700";

	let selectedPrices = [];
	let worlds_price;
	let isHqTable = false;

	$: worlds_price = updateData(listings);
	$: selectedPrices = isHqTable ? worlds_price.hq : worlds_price.nq;

	function updateData(_listings) {
		var price_list = { nq: [], hq: [] };
		if (_listings.length <= 0) {
			return price_list;
		}

		var worlds = getDataCenter(get(main_dc)).worlds ?? [];
		worlds.forEach((world_id) => {
			var world = getWorld(world_id);
			var nq = getWorldListing(world.name, false);
			var hq = getWorldListing(world.name, true);
			if (nq.length > 0) {
				price_list.nq.push(getLowestPriceItem(nq));
			}
			if (hq.length > 0) {
				price_list.hq.push(getLowestPriceItem(hq));
			}
		});
		price_list.nq.sort((a, b) => a.pricePerUnit - b.pricePerUnit);
		price_list.hq.sort((a, b) => a.pricePerUnit - b.pricePerUnit);
		return price_list;
	}

	function getWorldListing(worldName, hq) {
		return listings.filter(
			(listing) => listing.worldName === worldName && listing.hq === hq
		);
	}
</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
	<button
		on:click={() => (isHqTable = false)}
		type="button"
		class={isHqTable ? unSelectedStyle : selectedStyle}>Normal Quality</button
	>
	<button
		on:click={() => (isHqTable = true)}
		type="button"
		class={isHqTable ? selectedStyle : unSelectedStyle}>High Quality</button
	>
	{#if selectedPrices.length > 0}
		<table class="w-full font-display text-sm text-left text-gray-300">
			<thead
				class="bg-item text-sm font-body uppercase text-gray-400"
			>
				<tr>
					<th scope="col" class="px-6 py-3"> World </th>
					<th scope="col" class="px-6 py-3"> Price </th>
					<th scope="col" class="px-6 py-3"> Quantity </th>
					<th scope="col" class="px-6 py-3"> Quality </th>
				</tr>
			</thead>
			<tbody class="font-body">
				{#each selectedPrices as item}
					<tr
						class="bg-primary text-base border-b border-gray-700 hover:bg-item"
					>
						<th
							scope="row"
							class="px-6 py-4 font-medium whitespace-nowrap text-white"
						>
							{item.worldName}
						</th>
						<td class="px-6 py-4 text-yellow-200">
							{formatNumberToGilString(item.pricePerUnit)}
						</td>
						<td class="px-6 py-4"> {item.quantity} </td>
						<td class="px-6 py-4">
							{item.hq === true ? "High" : "Normal"}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<div class="bg-item text-sm font-body uppercase text-gray-400 py-3">
			<h1 class="font-body font-semibold text-base text-center">
				No Item Found.
			</h1>
		</div>
	{/if}
</div>
