<script>
	import { onMount } from "svelte";
	import { BSON } from "../../node_modules/bson/lib/bson.mjs";
	import { get } from "svelte/store";
	import { world_mapping_store, world_store } from "../stores/dc_world_stores.js";
  import { getWorldNameFromMapping } from "../utils/world_function.js";

	let socket;
	let lastWorldList = [];
	onMount(() => {
		const addr = "wss://universalis.app/api/ws";

		socket = new WebSocket(addr);
		socket.onopen = function () {
			console.log("WebSocket Opened");
			world_store.subscribe((new_world_list) => {
				lastWorldList.forEach((world) => {
					socket.send(BSON.serialize({ event: "unsubscribe", channel: `sales/add{world=${world.id}}` }));
				});
				new_world_list.forEach((world) => {
					socket.send(BSON.serialize({ event: "subscribe", channel: `sales/add{world=${world.id}}` }));
				});
				lastWorldList = new_world_list
			});
		};
		socket.onmessage = function (event) {
			var reader = new FileReader();
			reader.onload = function () {
				var uint8Array = new Uint8Array(this.result);
				var bsonData = BSON.deserialize(uint8Array);
				var worldMapping = get(world_mapping_store)
				console.log(getWorldNameFromMapping(worldMapping, bsonData.world));
			};
			reader.readAsArrayBuffer(event.data);
		};
	});
</script>

<div class="h-100 mt-3 p-4 rounded-lg bg-primary" />
