<script>
	import { getItemImageUrl } from "../../../utils/item_utils.js";

	export let data;
</script>

<div>
	<div class="flex">
		<img class="h-20" src={getItemImageUrl(data.item_id)} alt={data.name} />
		<h1 class="text-white text-4xl font-black font-display my-auto ml-5">
			{data.name}
		</h1>
	</div>
	<div class="mt-6">
		<div
			class="h-100 p-5 w-96 max-w-full items-center justify-center rounded-2xl bg-item"
		>
			<h1 class="text-white font-display text-2xl font-bold">Lowest Price</h1>

			<div class="h-100 mt-3 p-4 rounded-lg bg-primary flex">
				<div class="">
					<h1 class="text-gray-300 font-body">Normal Quality</h1>
					<h1 class="text-money font-body font-black text-xl mt-2">
						{data.nqLowest != null ? data.nqLowest.pricePerUnit : "-"}
					</h1>
                    {#if data.nqLowest != null}
					<h4 class="text-summary font-body font-[0]">{data.nqLowest.quantity} Unit{data.nqLowest.quantity > 1 ? "s" : ""}</h4>
                    {/if}
				</div>
			</div>
			<div class="h-100 mt-3 p-4 rounded-lg bg-primary flex">
				<div class="">
					<h1 class="text-gray-300 font-body">High Quality</h1>
					<h1 class="text-money font-body font-black text-xl mt-2">
						{data.hqLowest != null ? data.hqLowest.pricePerUnit : "-"}
					</h1>
                    {#if data.hqLowest != null}
					<h3 class="text-summary font-body font-[0]">{data.hqLowest.quantity} Unit{data.hqLowest.quantity > 1 ? "s" : ""}</h3>
                    {/if}
				</div>
			</div>
		</div>
		<div
			class="h-100 p-5 w-96 max-w-full items-center justify-center rounded-2xl bg-item mt-6"
		>
			<h1 class="text-white font-display text-2xl font-bold">Highest Price</h1>
			<div class="h-100 mt-3 p-4 rounded-lg bg-primary flex">
				<div class="">
					<h1 class="text-gray-300 font-body">Normal Quality</h1>
					<h1 class="text-money2 font-body font-black text-xl mt-2">
						{data.nqHighest != null ? data.nqHighest.pricePerUnit : "-"}
					</h1>
                    {#if data.nqHighest != null}
					<h3 class="text-summary font-body font-[0]">{data.nqHighest.quantity} Unit{data.nqHighest.quantity > 1 ? "s" : ""}</h3>
                    {/if}
				</div>
			</div>
			<div class="h-100 mt-3 p-4 rounded-lg bg-primary flex">
				<div class="">
					<h1 class="text-gray-300 font-body">High Quality</h1>
					<h1 class="text-money2 font-body font-black text-xl mt-2">
						{data.hqHighest != null ? data.hqHighest.pricePerUnit : "-"}
					</h1>
                    {#if data.hqHighest != null}
					<h3 class="text-summary font-body font-[0]">{data.hqHighest.quantity} Unit{data.hqHighest.quantity > 1 ? "s" : ""}</h3>
                    {/if}
				</div>
			</div>
		</div>
	</div>
</div>
