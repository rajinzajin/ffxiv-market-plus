<script>
	import { formatNumberToGilString } from "../utils/format_function";

	export let listings = [];
</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[40rem]">
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
		<tbody class="max-h-[10rem] font-body">
			{#each listings as listing}
				<tr
					class="bg-primary text-base border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
				>
					<th
						scope="row"
						class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
					>
						{listing.retainerName}
					</th>
					<td class="px-6 py-4"> {listing.quantity} </td>
					<td class="px-6 py-4">
						{formatNumberToGilString(listing.pricePerUnit)}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
