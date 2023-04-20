<script>
	import "../app.css";
	import { page } from "$app/stores";
	import DataCenterSelector from "../components/DataCenterSelector.svelte";
	import WorldSelector from "../components/WorldSelector.svelte";
	import { filterWorldsByIDs } from "../utils/world_function";
	import { onMount } from "svelte";
	import {
		data_center_store,
		main_dc,
		main_world,
		world_mapping_store,
		world_store,
	} from "../stores/dc_world_stores";
	import { marketable_items } from "../stores/item_stores";
	import { title } from "../stores/stores";
	import { getDataCenter } from "../utils/data_center_function";
	import { get } from "svelte/store";

	export let data;
	let { data_centers, worlds } = data;

	$: activeUrl = $page.url.pathname;

	function onSelectDC(dc) {
		main_dc.set(dc.name);
		var available_worlds = filterWorldsByIDs(worlds, dc.worlds);
		world_store.set(available_worlds);
		main_world.set(available_worlds[0]);
	}
	function onSelectWorld(world) {
		main_world.set(world);
	}
	onMount(() => {
		marketable_items.set(data.marketable_items);
		world_mapping_store.set(data.world_mapping);
		data_center_store.set(data_centers);

		var available_worlds = filterWorldsByIDs(
			worlds,
			getDataCenter(data_centers, get(main_dc)).worlds
		);
		world_store.set(available_worlds);
		main_world.set(available_worlds[0]);
	});
</script>

<svelte:head>
	<title>{$title}</title>
</svelte:head>

<button
	data-drawer-target="logo-sidebar"
	data-drawer-toggle="logo-sidebar"
	aria-controls="logo-sidebar"
	type="button"
	class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
>
	<span class="sr-only">Open sidebar</span>
	<svg
		class="w-6 h-6"
		aria-hidden="true"
		fill="currentColor"
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			clip-rule="evenodd"
			fill-rule="evenodd"
			d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
		/>
	</svg>
</button>

<aside
	id="logo-sidebar"
	class="fixed top-0 left-0 z-40 w-[25rem] h-screen transition-transform -translate-x-full sm:translate-x-0"
	aria-label="Sidebar"
>
	<div id="sidebar" class="h-full px-6 py-9 overflow-y-auto">
		<a href="/" class="mb-5 mt-3 w-full">
			<!-- <img
				src="https://flowbite.com/docs/images/logo.svg"
				class="h-20 mx-auto mt-8"
				alt="Flowbite Logo"
			/> -->
			<div class="flex relative items-center w-full h-[9rem]">
				<div
					class="w-full text-center text-4xl font-[900] font-market dark:text-white"
				>
					<!-- <div class="absolute w-full h-full bg-white bg-opacity-25">d</div> -->

					XIV Market+

					<!-- <div class="absolute font-body font-black text-blue-400 text-9xl top-[-50%] right-[8%]">
						+
					</div> -->
				</div>
				<!-- <div class="absolute h-[6rem] w-full opacity-80">
					s
					<svg class="w-full h-full">
						<rect
							width="280"
							height="15"
							x="30"
							y="48"
							stroke="white"
							stroke-width="2"
							style="fill:rgb(37, 99, 235 );"
						/>
						<rect
							width="15"
							height="78"
							x="280"
							y="0"
							stroke="white"
							stroke-width="2"
							style="fill:rgb(37, 99, 235 );"
						/>
					</svg>
				</div> -->
			</div>
		</a>
		<div class="ml-2 mt-9 grid grid-cols-2 gap-3">
			<DataCenterSelector on_select_dc={onSelectDC} />
			<WorldSelector on_select_world={onSelectWorld} />
			<!-- <DataCenterSelector /> -->
		</div>
		<ul class="space-y-2 text-gray-400 font-body font-semibold text-lg mt-5">
			<li>
				<a
					href="/"
					class="{activeUrl === '/' &&
						'bg-item text-white'} flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-item"
				>
					<svg
						aria-hidden="true"
						class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" /><path
							d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"
						/></svg
					>
					<span class="ml-5">Market</span>
				</a>
			</li>
			<!-- <li>
				<a
					href="/data-centers"
					class="{activeUrl === '/data-centers' &&
						'bg-item text-white'} flex items-center p-2 rounded-lg hover:bg-item"
				>
					<svg
						aria-hidden="true"
						class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
						/></svg
					>
					<span class="flex-1 ml-5 whitespace-nowrap">Data Centers</span>
				</a>
			</li> -->
		</ul>
	</div>
</aside>
<div class="sm:ml-[25rem] px-6 py-8 bg-custom-ffxiv">
	<slot />
	<div class="grid grid-cols-8 mt-[4rem] gap-y-9 text-gray-300 font-[400]">
		<div
			class="text-center 2xl:text-left col-span-12 2xl:col-span-5 font-body text-md border-gray-500 2xl:border-r"
		>
			Created by <a class="text-white" href="https://github.com/rajinzajin" target="_blank">RajinZajin</a>
			<br />XIV Market+ is not affiliated with SQUARE ENIX.
			<br />
			<br />© 2010 - 2023 SQUARE ENIX CO., LTD. All Rights Reserved.
			<br />FINAL FANTASY, FINAL FANTASY XIV, FFXIV are registered trademarks or
			trademarks of Square Enix Holdings Co., Ltd.
			<br />Game content and materials are registered trademarks or trademarks
			of Square Enix Co., Ltd.
		</div>

		<div
			class="col-span-12 2xl:col-span-1 border-gray-500 2xl:border-r flex items-center justify-center"
		>
			<div>
				<div class="flex items-center justify-center mb-5">
					<a
						class="font-body hover:text-white"
						href="https://github.com/rajinzajin/ffxiv-market-plus"
						target="_blank"
					>
						<div class="flex items-center">
							<i class="fa fa-github text-3xl mr-3" />Github
						</div>
					</a>
				</div>
				<div class="flex justify-center">
					<a class="font-body hover:text-white" href="/privacy-policy"
						>Privacy Policy</a
					>
				</div>

				<div class="flex justify-center mt-2">
					<a
						target="_blank"
						class="font-body hover:text-white"
						href="https://github.com/rajinzajin/ffxiv-market-plus/blob/main/LICENSE"
						>MIT License</a
					>
				</div>
			</div>
		</div>
		<div
			class="col-span-12 2xl:col-span-1 text-lg flex items-center justify-center"
		>
			<div>
				<div>Powered by</div>
				<a
					href="https://universalis.app/"
					class="hover:text-white font-bold"
					target="_blank">Universalis</a
				>
			</div>
		</div>
	</div>
</div>
