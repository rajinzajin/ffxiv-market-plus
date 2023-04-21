<script>
	import { convertToArray, filterItemJsonObjects, getItemImageUrl } from "../utils/item_utils";
	import { main_dc } from "../stores/dc_world_stores";
	import { onMount } from "svelte";
	import { get } from "svelte/store";
	import axios from "axios";
	import { marketable_items } from "../stores/item_stores";

	export let on_select_item_callback = () => {};
	let main_data_center;
	let searchText;
	let searchResultVisible = "invisible";
	let searchResult = [];

	async function onSearch(e) {
		var item_name = e.target.value;

		const filteredJson = filterItemJsonObjects(
			get(marketable_items),
			item_name,
			15
		);
		searchResult = convertToArray(filteredJson);

		searchResultVisible =
			searchResult.length > 0 && item_name !== "" ? "visible" : "invisible";
	}
	async function onSelectItemSearch(item) {
		searchResultVisible = "invisible";
		searchText = item.en;
		on_select_item_callback(item._id);
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

<div class="w-full">
	<input
		autocomplete="off"
		type="text"
		id="search_input"
		class="px-5 font-body h-14 bg-primary w-full outline-none focus:outline-none placeholder:text-gray-200 text-gray-200 text-base rounded-lg block p-2.5"
		placeholder="Search item"
		on:input={onSearch}
		on:focus={onSearch}
		bind:value={searchText}
	/>
	<div class="relative">
		<div
			id="search_result"
			class="{searchResultVisible} bg-primary absolute max-h-80 rounded-xl overflow-y-auto mt-2 p-2 w-full z-50 text-white"
		>
			<ul>
				{#each searchResult as item}
					<li class="group h-auto cursor-pointer font-body font-bold text-gray-300">
						<a
							href="/market/{main_data_center}/{item._id}"
							class="flex m-auto group-hover:bg-higlight-1 py-2 rounded-lg"
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
							<div class="flex-1 h-full ml-3 my-auto group-hover:text-white">{item.en}</div>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
