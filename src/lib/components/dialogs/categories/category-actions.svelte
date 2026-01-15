<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import EllipsisVertical from "@lucide/svelte/icons/ellipsis";
	import Edit from "@lucide/svelte/icons/edit";
	import Trash2 from "@lucide/svelte/icons/trash-2";
	import * as m from "$lib/paraglide/messages";
	import type { AdminCategoryResponse } from "$lib/api/client";

	type Category = AdminCategoryResponse;

	let {
		category,
		onEdit,
		onDelete
	}: {
		category: Category;
		onEdit: (category: Category) => void;
		onDelete: (category: Category) => void;
	} = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button variant="ghost" size="icon" class="h-8 w-8">
			<span class="sr-only">Open menu</span>
			<EllipsisVertical class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end" class="w-40">
		<DropdownMenu.Item onclick={() => onEdit(category)}>
			<Edit class="mr-2 h-4 w-4" />
			{m["common.edit"]()}
		</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item onclick={() => onDelete(category)} class="text-red-600">
			<Trash2 class="mr-2 h-4 w-4" />
			{m["common.delete"]()}
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
