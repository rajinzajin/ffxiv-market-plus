<script>
	import axios from "axios";
	import { getItemImageUrl, getItemName } from "../utils/item_utils";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { get } from "svelte/store";
	import { main_dc } from "../stores/dc_world_stores";
	import CardLoading from "./CardLoading.svelte";

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
			{:else}
				<div class="w-full h-full">
					<CardLoading show={true} absolute={false} />
				</div>
			{/if}
		</div>
		<div class="ml-5">
			<h1 class="text-white font-display font-bold text-xl">{item_name}</h1>
			<button
				on:click={() => goto(`market/${get(main_dc)}/${item_id}`)}
				type="button"
				class="text-white hover:border-blue-500 font-body text-base font-semibold mt-3 border-2 border-white rounded-lg px-5 py-2"
				>Check Price</button
			>
		</div>
	</div>
{/if}
