<script>
	import { onMount } from "svelte";
	import axios from "axios";

	let searchResultVisible = "invisible";
	let searchResult = [];

	onMount(async () => {
		// var res = await axios("/api/data-centers");
		// console.log(res.data);
	});

	async function onSearch(e) {
		var item_name = e.target.value;
		var res = await axios.post("/api/search-item", {
			item_name,
			max_results: 15,
		});
		searchResult = res.data;
		searchResultVisible =
			searchResult.length > 0 && item_name !== "" ? "visible" : "invisible";
	}
</script>

<div class="px-6 py-8 bg-secondary">
	<div class="grid grid-cols-1 gap-4 mb-4">
		<div
			class="h-100 p-5 w-1/3 max-w-full items-center justify-center rounded-2xl bg-item"
		>
			<div class="text-white text-center font-bold text-2xl">Search Item</div>
			<input
				autocomplete="off"
				type="text"
				id="first_name"
				class="bg-primary w-full outline-none focus:outline-none mt-4 text-gray-400 text-sm rounded-lg block p-2.5"
				placeholder="Search item"
				on:input={onSearch}
			/>
			<div class="relative">
				<div
					class="{searchResultVisible} bg-item absolute max-h-80 rounded-2xl overflow-y-auto mt-2 pl-2 w-full z-50 text-white"
				>
					<ul>
						{#each searchResult as item}
							<li class="h-auto">
								<div class="flex m-auto hover:bg-primary py-2">
									<img
										src="https://rajinzajin.github.io/ffxiv-assets/icon2x/{item._id}.png"
										alt="Flowbite Logo"
										class="ml-3 h-10"
									/>
									<div class="flex-1 h-full ml-3 my-auto">{item.en}</div>
								</div>
							</li>
						{/each}
					</ul>
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
