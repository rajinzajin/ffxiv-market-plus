<script>
	export let show = false;
	let show_class;
	$: show_class = show ? "" : "hidden";
</script>

<div class="{show_class} absolute w-full h-full">
	<div class="absolute rounded-lg w-full h-full bg-opacity-[0.1] blur-md bg-black backdrop-blur-sm" />
	<span class="absolute loader w-9 h-9 m-auto top-0 left-0 right-0 bottom-0" />
</div>
