<script>
	// import { serialize, deserialize } from "bson";
	import { onMount } from "svelte";
	import { json } from "@sveltejs/kit";
	import { BSON } from "../../node_modules/bson/lib/bson.mjs";
	let socket;
	onMount(() => {
		const addr = "wss://universalis.app/api/ws";

		socket = new WebSocket(addr);
		socket.onopen = function () {
			console.log("Opened");
			socket.send(
				BSON.serialize({ event: "subscribe", channel: "listings/add" })
			);
		};
		socket.onmessage = function (event) {
			var reader = new FileReader();
			reader.onload = function () {
				var uint8Array = new Uint8Array(this.result);
				console.log(BSON.deserialize(uint8Array));
			};
			reader.readAsArrayBuffer(event.data);
		};
	});
</script>

<div class="h-100 mt-3 p-4 rounded-lg bg-primary" />
