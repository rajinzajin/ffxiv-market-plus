<script>
	import { formatNumberToGilString } from "../utils/format_function";

	export let listings = [];
</script>

{#if listings.length > 0}
	<div class="relative overflow-x-auto shadow-md sm:rounded-lg h-full">
		<table class="w-full font-display text-sm text-left text-gray-400">
			<thead
				class=" sticky top-0 bg-item text-sm font-body text-gray-700 uppercase dark:text-gray-400"
			>
				<tr>
					<th scope="col" class="px-6 py-3"> Retainer name </th>
					<th scope="col" class="px-6 py-3"> Quantity </th>
					<th scope="col" class="px-6 py-3"> Price </th>
				</tr>
			</thead>
			<tbody class="max-h-[10rem] font-body text-gray-300">
				{#each listings as listing}
					<tr
						class="bg-primary text-base border-b border-gray-700 hover:bg-item"
					>
						<th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap">
							{listing.retainerName}
						</th>
						<td class="px-6 py-4"> {listing.quantity} </td>
						<td class="px-6 py-4 text-yellow-300">
							{formatNumberToGilString(listing.pricePerUnit)}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
