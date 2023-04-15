<script>
	let dropdownOpened = false;
	export let worlds;
	export let selected_world;
	export let on_select_world;

	$: {
		if (selected_world != null) {
			dropdownOpened = false;
			on_select_world(worlds[selected_world]);
		}
	}
</script>

<div>
	<button
		data-dropdown-toggle="dropdown"
		class="w-full relative text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-md font-body font-[700] px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		type="button"
		on:click={() => (dropdownOpened = !dropdownOpened)}
		><span>{worlds[selected_world].name}</span>
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
			id="dropdown"
			class="{dropdownOpened
				? ''
				: 'hidden'} w-full absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
		>
			<ul
				class="w-full py-3 bg-secondary text-white"
				aria-labelledby="dropdownDefaultButton"
			>
				<h1 class="text-gray-400 font-display font-bold text-lg ml-5 mt-3 mb-1">
					World
				</h1>
				{#each worlds as world, index}
					<li>
						<div
							on:click={() => (selected_world = index)}
							on:keydown={() => {}}
							class="mx-2 h-10 rounded-lg pl-3 cursor-pointer flex items-center hover:bg-blue-700"
						>
							{world.name}
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
