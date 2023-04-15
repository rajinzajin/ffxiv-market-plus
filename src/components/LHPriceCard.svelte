<script>
    import { formatNumberToGilString } from "../utils/format_function";
    export let item
    export let title
    export let color
</script>

<div class="h-100 mt-3 p-4 rounded-lg bg-primary">
    <h1 class="text-gray-300 font-body">{title}</h1>
    <h1 class="text-{color} font-body font-black text-xl mt-2">
        {item != null ? formatNumberToGilString(item.pricePerUnit) : "-"}
    </h1>
    {#if item != null}
        <div class="flex items-center">
            <span class="flex-auto text-summary font-body font-[0]">
                {item.quantity} Unit{item.quantity > 1
                    ? "s"
                    : ""}
            </span>
            <span class="flex-auto font-body font-semibold text-lg text-gray-400 text-right">{item.worldName}</span>
        </div>
    {/if}
</div>