<script>
	import { onMount } from "svelte";
	import { data_center_store, main_dc } from "../stores/dc_world_stores";
	let dropdownOpened = false;
	let data_centers = [];
	let selected_dc;

	export let on_select_dc;

	function selectDC(dc) {
		dropdownOpened = false;
		on_select_dc(dc);
	}
	onMount(() => {
		data_center_store.subscribe((value) => (data_centers = value));
		main_dc.subscribe((value) => (selected_dc = value));

		document.addEventListener("click", handleClick);
		return () => {
			document.removeEventListener("click", handleClick);
		};
	});

	function handleClick(event) {
		const dc_result_element = document.getElementById("dc_result_element");
		const dc_button = document.getElementById("dc_button");
		if (
			!dc_result_element.contains(event.target) &&
			!dc_button.contains(event.target)
		) {
			dropdownOpened = false;
		}
	}
</script>

<div>
	<button
		id="dc_button"
		data-dropdown-toggle="dropdown"
		class="w-full relative text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-md font-body font-[700] px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		type="button"
		on:click={() => (dropdownOpened = !dropdownOpened)}
		><span>{selected_dc != null ? selected_dc.name : ""}</span>
		<svg
			class="w-4 h-4 ml-2 absolute right-3"
			aria-hidden="true"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M19 9l-7 7-7-7"
			/></svg
		>
	</button>
	<!-- Dropdown menu -->
	<div class="relative">
		<div
			id="dc_result_element"
			class="{dropdownOpened
				? ''
				: 'hidden'} w-full absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
		>
			<ul
				class="w-full py-3 bg-secondary text-white"
				aria-labelledby="dropdownDefaultButton"
			>
				<h1
					class="select-none text-gray-400 font-display font-bold text-lg ml-5 mt-3 mb-1"
				>
					Data Center
				</h1>
				{#each data_centers as data_center}
					<li>
						<div
							on:click={() => selectDC(data_center)}
							on:keydown={() => {}}
							class="select-none mx-2 h-10 rounded-lg pl-3 cursor-pointer flex items-center hover:bg-blue-700"
						>
							{data_center.name}
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
