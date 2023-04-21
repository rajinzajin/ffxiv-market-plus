<script>
	import { onMount } from "svelte";
	import { BSON } from "../../node_modules/bson/lib/bson.mjs";
	import { main_dc, world_store } from "../stores/dc_world_stores.js";
	import { getItemName } from "../utils/item_utils.js";
	import { getWorld } from "../utils/world_function.js";
	
	const max_array = 8;
	export let onSelectEvent

	let socket;
	let lastWorldList = [];
	let m_events = [];

	onMount(() => {
		const addr = "wss://universalis.app/api/ws";

		socket = new WebSocket(addr);
		socket.onopen = function () {
			world_store.subscribe((new_world_list) => {
				lastWorldList.forEach((world) => {
					socket.send(
						BSON.serialize({
							event: "unsubscribe",
							channel: `listings/add{world=${world.id}}`,
						})
					);
				});
				new_world_list.forEach((world) => {
					socket.send(
						BSON.serialize({
							event: "subscribe",
							channel: `listings/add{world=${world.id}}`,
						})
					);
				});
				lastWorldList = new_world_list;
			});
		};
		socket.onmessage = function (event) {
			var reader = new FileReader();
			reader.onload = function () {
				var uint8Array = new Uint8Array(this.result);
				var bsonData = BSON.deserialize(uint8Array);
				if (m_events.length >= max_array) {
					m_events.shift();
				}
				m_events.push(bsonData);
				m_events = m_events;
			};
			reader.readAsArrayBuffer(event.data);
		};

		return () => {
			socket.close();
		};
	});
</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg h-full">
	<table class="w-full text-sm text-left">
		<thead
			class="text-xl text-center font-display text-white bg-item"
		>
			<tr>
				<th scope="col" class="px-6 py-3 font-[400]"> Recent activity - {$main_dc}</th>
			</tr>
		</thead>
		<tbody class="text-base font-body text-white">
			{#each [...m_events].reverse() as m_event}
				<tr on:click={()=>onSelectEvent(m_event)} class="bg-primary hover:bg-item cursor-pointer">
					<td class="px-6 py-4 font-[100]"
						><span class="text-yellow-300">{m_event.listings.length}</span>
						listings of
						<span class="text-[#71bfff]">{getItemName(m_event.item)}</span>
						added to
						<span class="text-[#2af868]">{getWorld(m_event.world).name}</span
						></td
					>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
