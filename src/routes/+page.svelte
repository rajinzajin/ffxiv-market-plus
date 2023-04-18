<script>
	import { onMount } from "svelte";
	import MarketEvents from "../components/MarketEvents.svelte";
	import { main_dc } from "../stores/dc_world_stores";
	import ItemSearchBar from "../components/ItemSearchBar.svelte";

	let main_data_center;

	onMount(() => {
		main_dc.subscribe((value) => (main_data_center = value));
	});
</script>

<div class="flex h-[40rem]">
	<div class="bg-secondary">
		<div class="h-full">
			<div
				class="h-100 p-5 w-[40rem] max-w-full items-center justify-center rounded-2xl bg-item"
			>
				<h1 class="text-white text-center font-display font-black text-2xl">
					Search Item
				</h1>
				<div class="mt-5">
					<ItemSearchBar />
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
