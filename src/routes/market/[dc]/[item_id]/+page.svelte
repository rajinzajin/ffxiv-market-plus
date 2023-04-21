<script>
	import LhPriceCard from "../../../../components/LHPriceCard.svelte";
	import { getItemImageUrl } from "../../../../utils/item_utils.js";
	import ItemSearchBar from "../../../../components/ItemSearchBar.svelte";
	import { onMount } from "svelte";
	import { main_dc } from "../../../../stores/dc_world_stores";
	import CardLoading from "../../../../components/CardLoading.svelte";
	import axios from "axios";
	import { goto } from "$app/navigation";
	import { title } from "../../../../stores/stores";
	import MarketTable from "../../../../components/MarketTable.svelte";
	export let data;

	let itemLoading;
	let marketLoading = true;
	let listingData = {};
	
	$: ({ listings, nqLowest, nqHighest, hqLowest, hqHighest } = listingData);
	$: ({ data_center, item_detail } = data);
	$: {
		if (item_detail != null) {
			itemLoading = false;
		}
	}
	$: title.set(item_detail.Name);

	async function onSearchItemSelect(selected_item_id) {
		if (item_detail.id != selected_item_id) {
			itemLoading = true;
			await loadMarketData(data_center, selected_item_id);
		}
	}

	onMount(() => {
		var unsubscribe_main_dc = main_dc.subscribe(async (dc) => {
			goto(`/market/${dc}/${item_detail.id}`);
			await loadMarketData(dc, item_detail.id);
		});

		return () => {
			unsubscribe_main_dc();
		};
	});
	async function loadMarketData(dc, item_id) {
		marketLoading = true;
		var res = await axios.get(`/api/get_market_listing/${dc}/${item_id}`);
		listingData = res.data;
		marketLoading = false;
	}

	async function onClickRefresh() {
		if (marketLoading) return;

		await loadMarketData(data_center, item_detail.id);
	}
</script>

<div>
	<div class="grid grid-cols-12 gap-y-6 gap-x-4">
		<div class="col-span-12 2xl:col-span-9 flex items-center">
			<div class="relative">
				<CardLoading show={itemLoading} />
				<img
					class="h-[6rem] w-[6rem] min-h-[6rem] min-w-[6rem]"
					src={getItemImageUrl(item_detail.id)}
					onError="this.src='/img/error.png';"
					alt={item_detail.Name}
				/>
			</div>
			<div class="ml-5 font-display">
				<h1 class="text-white text-4xl font-black">
					{item_detail.Name}
				</h1>
				<h1 class="text-gray-400 text-lg font-black">
					{item_detail.Description !== null ? item_detail.Description : ""}
				</h1>
			</div>
		</div>
		<div
			class="col-span-12 2xl:col-span-3 px-2 w-full h-[3.7rem] items-center justify-center rounded-2xl bg-item"
		>
			<div class="w-full h-full flex items-center">
				<ItemSearchBar on_select_item_callback={onSearchItemSelect} />
			</div>
		</div>
	</div>
	<div class="grid grid-cols-12 gap-x-8 mt-6">
		<div class="col-span-12 2xl:col-span-4">
			<h1 class="text-white w-full text-2xl font-[700] text-center">
				{data_center}
			</h1>
			<div
				class="h-100 mt-4 p-5 w-full max-w-full items-center justify-center rounded-2xl bg-item"
			>
				<div class="flex justify-between">
					<h1 class="text-white font-display text-2xl font-bold">
						Lowest Price
					</h1>
					<span
						on:click={onClickRefresh}
						on:keyup={() => {}}
						class="{marketLoading
							? 'animate-spin'
							: ''} text-white select-none cursor-pointer text-3xl font-black font-material_icon"
					>
						refresh
					</span>
				</div>

				<div class="relative">
					<CardLoading show={marketLoading} />
					<LhPriceCard
						color="text-money"
						title="Normal Quality"
						item={nqLowest}
					/>
					<LhPriceCard
						color="text-money"
						title="High Quality"
						item={hqLowest}
					/>
				</div>
			</div>
			<div
				class="h-100 p-5 w-full max-w-full items-center justify-center rounded-2xl bg-item mt-6"
			>
				<h1 class="text-white font-display text-2xl font-bold">
					Highest Price
				</h1>

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
		<div class="col-span-12 2xl:col-span-8">
			<h1 class="text-white w-full text-2xl font-[700] text-center">
				<!-- Listings --> &nbsp;
			</h1>
			<div class="mt-4">
				<MarketTable {listings} />
				<!-- <ListingTable dc={get(main_dc)} item_id={item_detail.id} /> -->
			</div>
		</div>
	</div>
</div>
