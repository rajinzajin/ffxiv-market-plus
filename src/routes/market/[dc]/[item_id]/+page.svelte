<script>
	import LhPriceCard from "../../../../components/LHPriceCard.svelte";
	import { getItemImageUrl } from "../../../../utils/item_utils.js";
	import ItemSearchBar from "../../../../components/ItemSearchBar.svelte";
	import { onMount } from "svelte";
	import { main_dc } from "../../../../stores/dc_world_stores";
	import CardLoading from "../../../../components/CardLoading.svelte";
	import axios from "axios";
	import { goto } from "$app/navigation";
	export let data;

	let itemLoading;
	let marketLoading = true;
	let listingData = {};

	$: ({ nqLowest, nqHighest, hqLowest, hqHighest } = listingData);
	$: ({ data_center, item_detail } = data);
	$: {
		if (item_detail != null) {
			itemLoading = false;
		}
	}

	async function onSearchItemSelect(selected_item_id) {
		if (item_detail.id != selected_item_id) {
			itemLoading = true;
			await loadMarketData(data_center, selected_item_id);
		}
	}

	onMount(() => {
		var unsubscribe_main_dc = main_dc.subscribe(async (dc) => {
			if (dc != null) {
				goto(`/market/${dc.name}/${item_detail.id}`);
				await loadMarketData(dc.name, item_detail.id);
			}
		});

		return () => {
			unsubscribe_main_dc();
		};
	});
	async function loadMarketData(dc, item_id) {
		marketLoading = true
		var res = await axios.get(`/api/get_market_listing/${dc}/${item_id}`);
		listingData = res.data;
		marketLoading = false
	}
</script>

<div>
	<div
		class="h-100 py-2 mb-6 px-5 w-96 max-w-full items-center justify-center rounded-2xl bg-item"
	>
		<div class="w-full mb-4">
			<ItemSearchBar on_select_item_callback={onSearchItemSelect} />
		</div>
	</div>

	<div class="flex">
		<div class="relative">
			<CardLoading show={itemLoading} />
			<img
				class="h-20"
				src={getItemImageUrl(item_detail.id)}
				alt={item_detail.Name}
			/>
		</div>
		<div class="ml-5 font-display">
			<h1 class="text-white text-4xl font-black my-auto">
				{item_detail.Name}
			</h1>
			<h1 class="text-gray-400 text-lg font-black my-auto">
				{item_detail.Description !== null ? item_detail.Description : ""}
			</h1>
		</div>
	</div>
	<div class="mt-6">
		<div
			class="h-100 p-5 w-96 max-w-full items-center justify-center rounded-2xl bg-item"
		>
			<h1 class="text-white font-display text-2xl font-bold">Lowest Price</h1>

			<div class="relative">
				<CardLoading show={marketLoading} />
				<LhPriceCard
					color="text-money"
					title="Normal Quality"
					item={nqLowest}
				/>
				<LhPriceCard color="text-money" title="High Quality" item={hqLowest} />
			</div>
		</div>
		<div
			class="h-100 p-5 w-96 max-w-full items-center justify-center rounded-2xl bg-item mt-6"
		>
			<h1 class="text-white font-display text-2xl font-bold">Highest Price</h1>
			<div class="relative">
				<CardLoading show={marketLoading} />
				<LhPriceCard
					color="text-money2"
					title="Normal Quality"
					item={nqHighest}
				/>
				<LhPriceCard
					color="text-money2"
					title="High Quality"
					item={hqHighest}
				/>
			</div>
		</div>
	</div>
</div>
