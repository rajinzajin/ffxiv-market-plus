<script>
	import LhPriceCard from "../../../../components/LHPriceCard.svelte";
	import { getItemImageUrl } from "../../../../utils/item_utils.js";
	import ItemSearchBar from "../../../../components/ItemSearchBar.svelte";
	import { onMount } from "svelte";
	import { main_dc } from "../../../../stores/dc_world_stores";
	export let data;

	onMount(() => {
		var unsubscribe_main_dc = main_dc.subscribe((value) => {
			if (value != null) {
				console.log(`${value.name} selected`);
				
			}
		});
		return () => {
			unsubscribe_main_dc();
		};
	});
</script>

<div>
	<div
		class="h-100 py-2 mb-6 px-5 w-96 max-w-full items-center justify-center rounded-2xl bg-item"
	>
		<div class="w-full mb-4">
			<ItemSearchBar />
		</div>
	</div>

	<div class="flex">
		<img class="h-20" src={getItemImageUrl(data.item_id)} alt={data.name} />
		<div class="ml-5 font-display">
			<h1 class="text-white text-4xl font-black my-auto">
				{data.name}
			</h1>
			<h1 class="text-gray-400 text-lg font-black my-auto">
				{ data.item_detail.Description !== null ? data.item_detail.Description : ""}
			</h1>
		</div>
	</div>
	<div class="mt-6">
		<div
			class="h-100 p-5 w-96 max-w-full items-center justify-center rounded-2xl bg-item"
		>
			<h1 class="text-white font-display text-2xl font-bold">Lowest Price</h1>

			<LhPriceCard
				color="text-money"
				title="Normal Quality"
				item={data.nqLowest}
			/>
			<LhPriceCard
				color="text-money"
				title="High Quality"
				item={data.hqLowest}
			/>
		</div>
		<div
			class="h-100 p-5 w-96 max-w-full items-center justify-center rounded-2xl bg-item mt-6"
		>
			<h1 class="text-white font-display text-2xl font-bold">Highest Price</h1>
			<LhPriceCard
				color="text-money2"
				title="Normal Quality"
				item={data.nqHighest}
			/>
			<LhPriceCard
				color="text-money2"
				title="High Quality"
				item={data.hqHighest}
			/>
		</div>
	</div>
</div>
