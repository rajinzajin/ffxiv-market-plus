<script>
	import {
		convertToArray,
		filterItemJsonObjects,
		getItemImageUrl,
	} from "../utils/item_utils";
	import { main_dc, marketable_item_store } from "../stores/dc_world_stores";
	import { onMount } from "svelte";
	import { get } from "svelte/store";

	let main_data_center;
	let searchText;
	let searchResultVisible = "invisible";
	let searchResult = [];

	async function onSearch(e) {
		var item_name = e.target.value;

		var filteredJson = filterItemJsonObjects(
			get(marketable_item_store),
			item_name,
			18
		);
		searchResult = convertToArray(filteredJson);

		searchResultVisible =
			searchResult.length > 0 && item_name !== "" ? "visible" : "invisible";
	}
	async function onSelectItemSearch(item) {
		searchResultVisible = "invisible";
		searchText = item.en;
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
		main_dc.subscribe((value) => (main_data_center = value));
		document.addEventListener("click", handleClick);
		return () => {
			document.removeEventListener("click", handleClick);
		};
	});
</script>

<div>
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
					<li class="h-auto cursor-pointer font-body font-bold text-gray-300">
						<a
							href="/market/{main_data_center.name}/{item._id}"
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
