<script>
    export let title = ""
	let marketLoading = false;
</script>

<div
	class="h-full p-5 w-full items-center justify-center rounded-2xl bg-item"
>
	<div class="flex justify-between">
		<h1 class="text-white font-display text-2xl font-bold">{title}</h1>
		<span
			on:click={() => {}}
			on:keyup={() => {}}
			class="{marketLoading
				? 'animate-spin'
				: ''} text-white select-none cursor-pointer text-3xl font-black material-symbols-outlined"
		>
			refresh
		</span>
	</div>
	<slot />
</div>
