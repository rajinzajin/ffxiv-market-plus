<script>
	import LhPriceCard from "../../../../components/LHPriceCard.svelte";
	import {
		getHighestPriceItem,
		getItemImageUrl,
		getLowestPriceItem,
	} from "../../../../utils/item_utils.js";
	import ItemSearchBar from "../../../../components/ItemSearchBar.svelte";
	import { onMount } from "svelte";
	import { main_dc } from "../../../../stores/dc_world_stores";
	import { getItemMarketData } from "../../../../utils/item_request";
	import { get } from "svelte/store";
	import { filterArray } from "../../../../utils/array_object";

	export let data;
	let item;

	$: {
		item = data.item;
		if (item != null && get(main_dc) != null) {
			loadMarket();
		}
	}

	let hqLowest, nqLowest, hqHighest, nqHighest;

	onMount(async () => {
		var unsubscribe_main_dc = main_dc.subscribe(async (value) => {
			if (value != null) {
				await loadMarket();
			}
		});
		return () => {
			unsubscribe_main_dc();
		};
	});
	async function loadMarket() {
		var market_data = await getItemMarketData(item.ID, get(main_dc).name);

		var hqList = filterArray(market_data.listings, { hq: true });
		var nqList = filterArray(market_data.listings, { hq: false });

		hqLowest = getLowestPriceItem(hqList);
		nqLowest = getLowestPriceItem(nqList);

		hqHighest = getHighestPriceItem(hqList);
		nqHighest = getHighestPriceItem(nqList);
	}
</script>

{#if item != null}
	<div>
		<div
			class="h-100 py-2 mb-6 px-5 w-96 max-w-full items-center justify-center rounded-2xl bg-item"
		>
			<div class="w-full mb-4">
				<ItemSearchBar />
			</div>
		</div>

		<div class="flex">
			<img class="h-20" src={getItemImageUrl(item.ID)} alt={item.Name} />
			<div class="ml-5 font-display">
				<h1 class="text-white text-4xl font-black my-auto">
					{item.Name}
				</h1>
				<h1 class="text-gray-400 text-lg font-black my-auto">
					{item.Description}
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
					item={nqLowest}
				/>
				<LhPriceCard color="text-money" title="High Quality" item={hqLowest} />
			</div>
			<div
				class="h-100 p-5 w-96 max-w-full items-center justify-center rounded-2xl bg-item mt-6"
			>
				<h1 class="text-white font-display text-2xl font-bold">
					Highest Price
				</h1>
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
{/if}
