<script>
	export let show = false;
	let show_class;
	$: show_class = show ? "" : "hidden";
</script>

<div class={show_class}>
	<div class="absolute rounded-lg w-full h-full bg-opacity-50 bg-black" />
	<span
		class="loader mt-[-1rem] ml-[-1.18rem] w-9 h-9 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
	/>
</div>
