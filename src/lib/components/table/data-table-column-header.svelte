<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import type { Column } from "@tanstack/svelte-table";

	import ArrowUpDown from "@lucide/svelte/icons/arrow-up-down";
	import ArrowUp from "@lucide/svelte/icons/arrow-up";
	import ArrowDown from "@lucide/svelte/icons/arrow-down";

	type Props = {
		column: Column<any>;
		title: string;
	};

	let { column, title }: Props = $props();

	function toggleSort() {
		column.toggleSorting(column.getIsSorted() === "asc");
	}

	const sortState = $derived(column.getIsSorted());
</script>

<Button variant="ghost" onclick={toggleSort} class="flex h-8 items-center space-x-2 px-2">
	<span>{title}</span>
	{#if sortState === "asc"}
		<ArrowUp class="h-4 w-4" />
	{:else if sortState === "desc"}
		<ArrowDown class="h-4 w-4" />
	{:else}
		<ArrowUpDown class="h-4 w-4 opacity-50" />
	{/if}
</Button>
