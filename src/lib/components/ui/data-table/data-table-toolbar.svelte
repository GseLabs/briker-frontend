<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import Search from "@lucide/svelte/icons/search";
	import type { Column } from "@tanstack/table-core";
	import * as m from "$lib/paraglide/messages";

	interface Props {
		table: any;
		searchColumn: string;
		searchPlaceholder?: string;
		columnLabels?: Record<string, string>;
	}

	let {
		table,
		searchColumn,
		searchPlaceholder = m["common.search_placeholder"](),
		columnLabels = {}
	}: Props = $props();

	function getColumnLabel(columnId: string): string {
		return columnLabels[columnId] || columnId;
	}
</script>

<div class="flex items-center py-4">
	<div class="relative">
		<Search
			class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground"
		/>
		<input
			type="text"
			placeholder={searchPlaceholder}
			value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""}
			oninput={(e: Event) => {
				table.getColumn(searchColumn)?.setFilterValue((e.target as HTMLInputElement).value);
			}}
			onchange={(e: Event) => {
				table.getColumn(searchColumn)?.setFilterValue((e.target as HTMLInputElement).value);
			}}
			class="w-full max-w-sm rounded-md border border-input bg-background py-2 pr-4 pl-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
		/>
	</div>

	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			{#snippet child({ props })}
				<Button {...props} variant="outline" class="ml-auto">
					{m["common.columns"]()}
				</Button>
			{/snippet}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="end">
			{#each table
				.getAllColumns()
				.filter((col: Column<any>) => col.getCanHide()) as column (column.id)}
				<DropdownMenu.CheckboxItem
					class="capitalize"
					bind:checked={() => column.getIsVisible(), (v: boolean) => column.toggleVisibility(!!v)}
				>
					{getColumnLabel(column.id)}
				</DropdownMenu.CheckboxItem>
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>
