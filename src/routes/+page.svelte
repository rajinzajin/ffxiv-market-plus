<script>
	import { onMount } from "svelte";
	import MarketEvents from "../components/MarketEvents.svelte";
	import { main_dc } from "../stores/dc_world_stores";
	import ItemSearchBar from "../components/ItemSearchBar.svelte";
	import { title } from "../stores/stores";
	import CardRefresh from "../components/CardRefresh.svelte";
	import { getMarketRecentUpdate } from "../utils/item_request";
	import { get } from "svelte/store";
	let recent_updates;

	$: {
		if (recent_updates != null) console.log(recent_updates);
	}
	title.set("Home");

	async function loadRecentUpdate() {
		recent_updates = await getMarketRecentUpdate(get(main_dc));
	}

	onMount(() => {
		// loadRecentUpdate();
	});
</script>

<div class="h-[40rem]">
	<div class="bg-secondary">
		<div class="h-full">
			<div class="grid grid-cols-12">
				<div
					class="h-100 col-span-12 xl:col-span-6 p-5 items-center justify-center rounded-2xl bg-item"
				>
					<h1 class="text-white text-center font-display font-black text-2xl">
						Search Item
					</h1>
					<div class="mt-5">
						<ItemSearchBar />
					</div>
				</div>
			</div>
			<div class="mt-7 grid grid-cols-12">
				<div class="col-span-12 xl:col-span-6">
					<CardRefresh title="Recent Update">tes</CardRefresh>
				</div>
			</div>
			<!-- <MarketEvents /> -->
		</div>
	</div>
</div>

<style lang="postcss">
	/* :global(html) {
		background-color: rgb(32 36 66 / var(--tw-bg-opacity)) !important;
	} */
</style>
