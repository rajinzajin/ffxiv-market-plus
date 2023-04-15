<script>
	import LhPriceCard from "../../../../components/LHPriceCard.svelte";
	import { getItemImageUrl } from "../../../../utils/item_utils.js";

	export let data;
	let { item_detail } = data
</script>

<div>
	<div class="flex">
		<img class="h-20" src={getItemImageUrl(data.item_id)} alt={data.name} />
		<div class="ml-5 font-display">
			<h1 class="text-white text-4xl font-black my-auto">
				{data.name}
			</h1>
			<h1 class="text-gray-400 text-lg font-black my-auto">
				{item_detail["Description"]}
			</h1>
		</div>
		
	</div>
	<div class="mt-6">
		<div
			class="h-100 p-5 w-96 max-w-full items-center justify-center rounded-2xl bg-item"
		>
			<h1 class="text-white font-display text-2xl font-bold">Lowest Price</h1>

			<LhPriceCard color="text-money" title="Normal Quality" item={data.nqLowest} />
			<LhPriceCard color="text-money" title="High Quality" item={data.hqLowest} />
		</div>
		<div
			class="h-100 p-5 w-96 max-w-full items-center justify-center rounded-2xl bg-item mt-6"
		>
			<h1 class="text-white font-display text-2xl font-bold">Highest Price</h1>
			<LhPriceCard
				color="text-money2"
				title="Normal Quality"
				item={data.nqHighest}
			/>
			<LhPriceCard
				color="text-money2"
				title="High Quality"
				item={data.hqHighest}
			/>
		</div>
	</div>
</div>
