<script>
	import { onMount } from "svelte";
	import axios from "axios";

	onMount(async () => {
		var res = await axios("/api/data-centers");
		// console.log(res.data);
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
				id="first_name"
				class="bg-primary w-full outline-none focus:outline-none mt-4 text-gray-400 text-sm rounded-lg block p-2.5"
				placeholder="Search item"
			/>
		</div>
	</div>
</div>

<style lang="postcss">
	/* :global(html) {
		background-color: rgb(32 36 66 / var(--tw-bg-opacity)) !important;
	} */
</style>
