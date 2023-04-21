<script>
	import axios from "axios";
	import { getItemImageUrl, getItemName } from "../utils/item_utils";
	import { onMount } from "svelte";

	export let item_id = -1;
	let item_name;
	let imageloaded = false;

	let image_src;

	$: image_src = getItemImageUrl(item_id);
	$: updateImage(item_id);
	$: item_name = getItemName(item_id);

	onMount(() => {
		updateImage(item_id);
	});
	function updateImage(id) {
		if (id == -1) return;

		imageloaded = false;
		const image = new Image();
		image.src = image_src;
		image.onload = () => (imageloaded = true);
	}
</script>

{#if item_id != -1}
	<div class="w-full flex p-5 bg-primary rounded-lg items-center mb-10">
		<div class="w-20 h-20">
			{#if imageloaded}
				<img class="w-full h-full" src={image_src} alt={item_id} />
			{/if}
		</div>
		<h1 class="text-white ml-5 font-display font-bold text-2xl">{item_name}</h1>
	</div>
{/if}
