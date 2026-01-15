<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import { Button } from "$lib/components/ui/button";
	import * as m from "$lib/paraglide/messages";
	import type { AdminCategoryResponse } from "$lib/api/client";

	type Category = AdminCategoryResponse;

	let {
		open = $bindable(),
		category,
		onConfirm,
		onClose
	}: {
		open: boolean;
		category: Category | null;
		onConfirm: () => void;
		onClose: () => void;
	} = $props();

	let isDeleting = $state(false);

	function handleConfirm() {
		isDeleting = true;
		onConfirm();
	}

	// Reset deleting state when not deleting anymore
	$effect(() => {
		if (!isDeleting) return;
		const timeout = setTimeout(() => {
			isDeleting = false;
		}, 100);
		return () => clearTimeout(timeout);
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>{m["admin.categories.dialogs.delete.title"]()}</Dialog.Title>
			<Dialog.Description>
				{m["admin.categories.dialogs.delete.description"]({ name: category?.name || "" })}
			</Dialog.Description>
		</Dialog.Header>
		<div class="py-4">
			<p class="text-lg font-medium">{category?.name}</p>
		</div>
		<Dialog.Footer>
			<Button variant="outline" onclick={onClose} disabled={isDeleting}>
				{m["common.cancel"]()}
			</Button>
			<Button variant="destructive" onclick={handleConfirm} disabled={isDeleting}>
				{isDeleting ? m["common.deleting"]() : m["common.delete"]()}
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
