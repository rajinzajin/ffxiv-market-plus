<script>
	import { onMount } from "svelte";
	import axios from "axios";

	let searchResultVisible = "invisible";
	let searchResult = [];
	let searchText = "";

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

	function onSelectItemSearch(selected_item) {
		searchResultVisible = "invisible";
		searchText = selected_item;
	}

	function handleClick(event) {
		const search_result_element = document.getElementById("search_result");
		const search_input_element = document.getElementById("search_input");
		if (
			!search_result_element.contains(event.target) &&
			!search_input_element.contains(event.target)
		) {
			searchResultVisible = "invisible";
		}
	}

	onMount(() => {
		document.addEventListener("click", handleClick);
	});
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
				id="search_input"
				class="bg-primary w-full outline-none focus:outline-none mt-4 text-gray-400 text-sm rounded-lg block p-2.5"
				placeholder="Search item"
				on:input={onSearch}
				on:focus={onSearch}
				bind:value={searchText}
			/>
			<div class="relative">
				<div
					id="search_result"
					class="{searchResultVisible} bg-item absolute max-h-80 rounded-2xl overflow-y-auto mt-2 pl-2 w-full z-50 text-white"
				>
					<ul>
						{#each searchResult as item}
							<li class="h-auto cursor-pointer">
								<div
									class="flex m-auto hover:bg-primary py-2"
									on:keydown={() => {}}
									on:click={() => {
										onSelectItemSearch(item.en);
									}}
								>
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
