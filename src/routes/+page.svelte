<script>
	import { onMount } from "svelte";
	import axios from "axios";

	onMount(async () => {
		var res = await axios("/api/data-centers");
		console.log(res.data);
	});
</script>

<div class="p-10 sm:ml-64 bg-secondary">
	<div class="grid grid-cols-3 gap-4 mb-4">
		<div
			class="flex items-center justify-center h-24 rounded bg-item"
		>
		</div>
		<div
			class="flex items-center justify-center h-24 rounded bg-item"
		>
		</div>
		<div
			class="flex items-center justify-center h-24 rounded bg-item"
		>
		</div>
	</div>
	<div
		class="flex items-center justify-center h-48 mb-4 rounded bg-item"
	>
	</div>
	<div class="grid grid-cols-2 gap-4 mb-4">
		<div
			class="flex items-center justify-center rounded bg-item h-28"
		>
		</div>
		<div
			class="flex items-center justify-center rounded bg-item h-28"
		>
		</div>
		<div
			class="flex items-center justify-center rounded bg-item h-28"
		>
		</div>
		<div
			class="flex items-center justify-center rounded bg-item h-28"
		>
		</div>
	</div>
	<div
		class="flex items-center justify-center h-48 mb-4 rounded bg-item"
	>
	</div>
	<div class="grid grid-cols-2 gap-4">
		<div
			class="flex items-center justify-center rounded bg-item h-28"
		>
		</div>
		<div
			class="flex items-center justify-center rounded bg-item h-28"
		>
		</div>
		<div
			class="flex items-center justify-center rounded bg-item h-28"
		>
		</div>
		<div
			class="flex items-center justify-center rounded bg-item h-28"
		>
		</div>
	</div>
</div>

<style lang="postcss">
	/* :global(html) {
		background-color: rgb(32 36 66 / var(--tw-bg-opacity)) !important;
	} */
</style>
