<script>
	import { onMount } from "svelte";
	import { main_world, world_store } from "../stores/dc_world_stores";

	let dropdownOpened = false;
	let worlds = [];
	let m_world;

	export let on_select_world;

	function selectWorld(world) {
		dropdownOpened = false;
		on_select_world(world);
	}
	onMount(() => {
		world_store.subscribe((value) => (worlds = value));
		main_world.subscribe((value) => (m_world = value));

		document.addEventListener("click", handleClick);
		return () => {
			document.removeEventListener("click", handleClick);
		};
	});

	function handleClick(event) {
		const world_result_element = document.getElementById(
			"world_result_element"
		);
		const world_button = document.getElementById("world_button");
		if (
			!world_result_element.contains(event.target) &&
			!world_button.contains(event.target)
		) {
			dropdownOpened = false;
		}
	}
</script>

<div>
	<button
		id="world_button"
		data-dropdown-toggle="dropdown"
		class="w-full relative text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-md font-body font-[700] px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		type="button"
		on:click={() => (dropdownOpened = !dropdownOpened)}
		><span>{m_world != null ? m_world.name : ""}</span>
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
			id="world_result_element"
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
					World
				</h1>
				{#each worlds as world}
					<li>
						<div
							on:click={() => selectWorld(world)}
							on:keydown={() => {}}
							class="select-none mx-2 h-10 rounded-lg pl-3 cursor-pointer flex items-center hover:bg-blue-700"
						>
							{world.name}
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
