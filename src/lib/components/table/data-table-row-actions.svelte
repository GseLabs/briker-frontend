<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import EllipsisVertical from "@lucide/svelte/icons/ellipsis";
	import type { Snippet } from "svelte";

	type Props = {
		actions: Snippet;
	};

	let { actions }: Props = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button variant="ghost" size="icon" class="h-8 w-8">
			<span class="sr-only">Open menu</span>
			<EllipsisVertical class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end" class="w-40">
		{@render actions()}
	</DropdownMenu.Content>
</DropdownMenu.Root>
