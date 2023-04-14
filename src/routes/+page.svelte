<script>
	import { onMount } from "svelte";
	import axios from "axios";
	import { getItemHistory, getItemImageUrl } from "../utils/item_utils";

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

	async function onSelectItemSearch(item) {
		searchResultVisible = "invisible";
		searchText = item.en;
		navigation;
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

<div class="bg-secondary">
	<div class="grid grid-cols-3 gap-4 mb-4">
		<div
			class="h-100 p-5 w-full max-w-full items-center justify-center rounded-2xl bg-item"
		>
			<h1 class="text-white text-center font-display font-black text-3xl">
				Search Item
			</h1>
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
					class="{searchResultVisible} bg-item absolute max-h-80 rounded-xl overflow-y-auto mt-2 p-2 w-full z-50 text-white"
				>
					<ul>
						{#each searchResult as item}
							<li
								class="h-auto cursor-pointer font-body font-bold text-gray-300"
							>
								<a
									href="/market/{item._id}"
									class="flex m-auto hover:bg-primary py-2 rounded-lg"
									on:keydown={() => {}}
									on:click={() => {
										onSelectItemSearch(item);
									}}
								>
									<img
										src={getItemImageUrl(item._id)}
										alt={item.en}
										class="ml-3 h-10"
									/>
									<div class="flex-1 h-full ml-3 my-auto">{item.en}</div>
								</a>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
		<div
			class="h-full p-5 w-full max-w-full items-center justify-center rounded-2xl bg-item"
		/>
	</div>
</div>

<style lang="postcss">
	/* :global(html) {
		background-color: rgb(32 36 66 / var(--tw-bg-opacity)) !important;
	} */
</style>
