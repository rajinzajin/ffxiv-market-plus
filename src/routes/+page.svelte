<script>
	import { onMount } from "svelte";
	import MarketEvents from "../components/MarketEvents.svelte";
	import { main_dc } from "../stores/dc_world_stores";
	import ItemSearchBar from "../components/ItemSearchBar.svelte";
	import { title } from "../stores/stores";
	import CardRefresh from "../components/CardRefresh.svelte";
	import { getMarketRecentUpdate } from "../utils/item_request";
	import { get } from "svelte/store";
	import { getItemImageUrl, getItemNameByID } from "../utils/item_utils";
	import { marketable_items } from "../stores/item_stores";
	import CardLoading from "../components/CardLoading.svelte";
	import { getWorld } from "../utils/world_function";
	import ListingTable from "../components/ListingTable.svelte";
  import ItemCard from "../components/ItemCard.svelte";
	let recent_updates = [];
	let isLoading = true;
	let selectedEvent = { listings: [] };
	let selectedEventListings = [];

	title.set("Home");

	$: selectedEventListings = selectedEvent.listings;

	async function loadRecentUpdate() {
		isLoading = true;
		recent_updates = await getMarketRecentUpdate(get(main_dc), 5);
		isLoading = false;
	}

	function onClickRefresh() {
		loadRecentUpdate();
	}
	onMount(() => {
		var unsubscribe = main_dc.subscribe(() => {
			loadRecentUpdate();
		});

		return () => {
			unsubscribe();
		};
	});
</script>

<div>
	<div>
		<div class="h-full">
			<div class="grid grid-cols-12 gap-x-6 gap-y-8">
				<div class="col-span-12 2xl:col-span-6">
					<div class="w-full">
						<div
							class="h-100 col-span-12 xl:col-span-6 p-5 items-center justify-center rounded-2xl bg-item"
						>
							<div
								class="text-xl text-center font-display font-[400] text-white"
							>
								Search Item
							</div>
							<div class="mt-1">
								<ItemSearchBar />
							</div>
						</div>
					</div>
					<div class="mt-7 w-full h-[35rem]">
						<MarketEvents onSelectEvent={(val) => (selectedEvent = val)} />
					</div>
					<!-- <div class="mt-7 w-full">
						<CardRefresh
							{isLoading}
							onRefresh={onClickRefresh}
							title="Recent Update - {$main_dc}"
						>
							<div class="mt-8 h-[28rem] relative">
								<CardLoading show={isLoading} />
								{#each recent_updates as recent_update}
									<a href="/market/{get(main_dc)}/{recent_update.itemID}">
										<div
											class="flex select-none p-2 my-4 items-center font-display text-white text-xl font-semibold border-2 border-secondary hover:border-gray-400 rounded-lg"
										>
											<img
												class="w-14 h-14"
												src={getItemImageUrl(recent_update.itemID)}
												alt={recent_update.itemID}
											/>
											<div class="ml-4">
												<h1>
													{getItemNameByID(
														get(marketable_items),
														recent_update.itemID
													)}
												</h1>
												<h1 class="font-semibold text-gray-400">
													{getWorld(recent_update.worldID).name}
												</h1>
											</div>
										</div>
									</a>
								{/each}
							</div>
						</CardRefresh>
					</div> -->
				</div>
				<div class="col-span-12 2xl:col-span-6">
					<ItemCard item_id={selectedEvent.item}/>
					<div class="h-[35rem]">
						<ListingTable listings={selectedEventListings} /></div>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	/* :global(html) {
		background-color: rgb(32 36 66 / var(--tw-bg-opacity)) !important;
	} */
</style>
