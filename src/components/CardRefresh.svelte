<script>
	export let title = "";
	export let isLoading = false;
	export let onRefresh = () => {};
</script>

<div class="h-full p-5 w-full items-center justify-center rounded-2xl bg-item">
	<div class="flex justify-between">
		<h1 class="text-white font-display text-2xl font-bold">{title}</h1>
		<svg
			on:keyup={() => {}}
			on:click={() => {
				if (!isLoading) onRefresh();
			}}
			class="{isLoading
				? 'animate-spin'
				: ''} text-white select-none cursor-pointer text-3xl font-black"
			xmlns="http://www.w3.org/2000/svg"
			height="30"
			width="30"
			viewBox="0 0 24 24"
			fill="white"
			><path d="M0 0h24v24H0z" fill="none" /><path
				stroke="white"
				stroke-width="1"
				d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
			/></svg
		>
	</div>
	<slot />
</div>
