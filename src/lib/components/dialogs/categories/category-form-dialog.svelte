<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { createMutation, useQueryClient } from "@tanstack/svelte-query";
	import { api } from "$lib/api";
	import * as m from "$lib/paraglide/messages";
	import type { AdminCategoryResponse } from "$lib/api/client";
	import LoaderCircle from "@lucide/svelte/icons/loader-circle";
	import { toast } from "svelte-sonner";

	type Category = AdminCategoryResponse;

	let {
		open = $bindable(),
		category,
		onClose
	}: {
		open: boolean;
		category?: Category | null;
		onClose: () => void;
	} = $props();

	const queryClient = useQueryClient();

	let name = $state(category?.name || "");

	// Reset form when dialog opens/closes
	$effect(() => {
		if (open) {
			name = category?.name || "";
		}
	});

	// Create mutation
	const createCategoryMutation = createMutation(() => ({
		mutationFn: async () => {
			if (!name.trim()) throw new Error("Name is required");

			const response = await api.admin.adminCategoriesPost({
				category: { name: name.trim() }
			});
			return response;
		},
		onSuccess: () => {
			toast.success(m["admin.categories.messages.create_success"]());
			queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
			onClose();
		},
		onError: (error) => {
			toast.error(
				error instanceof Error ? error.message : m["admin.categories.messages.create_error"]()
			);
		}
	}));

	// Update mutation
	const updateCategoryMutation = createMutation(() => ({
		mutationFn: async () => {
			if (!category?.id) throw new Error("Category ID is required");
			if (!name.trim()) throw new Error("Name is required");

			const response = await api.admin.adminCategoriesIdPut({
				id: category.id,
				category: { name: name.trim() }
			});
			return response;
		},
		onSuccess: () => {
			toast.success(m["admin.categories.messages.update_success"]());
			queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
			onClose();
		},
		onError: (error) => {
			toast.error(
				error instanceof Error ? error.message : m["admin.categories.messages.update_error"]()
			);
		}
	}));

	function handleSubmit() {
		if (!name.trim()) return;

		if (category) {
			updateCategoryMutation.mutate();
		} else {
			createCategoryMutation.mutate();
		}
	}

	function handleCancel() {
		onClose();
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>
				{category
					? m["admin.categories.dialogs.edit.title"]()
					: m["admin.categories.dialogs.create.title"]()}
			</Dialog.Title>
			<Dialog.Description>
				{category
					? m["admin.categories.dialogs.edit.description"]()
					: m["admin.categories.dialogs.create.description"]()}
			</Dialog.Description>
		</Dialog.Header>
		<div class="py-4">
			<Label for="category-name" class="mb-2 block text-sm font-medium">
				{m["admin.categories.dialogs.create.placeholder"]()}
			</Label>
			<Input
				id="category-name"
				bind:value={name}
				placeholder={m["admin.categories.dialogs.create.placeholder"]()}
				onkeydown={(e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						handleSubmit();
					}
				}}
				disabled={createCategoryMutation.isPending || updateCategoryMutation.isPending}
			/>
		</div>
		<Dialog.Footer>
			<Button
				variant="outline"
				onclick={handleCancel}
				disabled={createCategoryMutation.isPending || updateCategoryMutation.isPending}
			>
				{m["common.cancel"]()}
			</Button>
			<Button
				onclick={handleSubmit}
				disabled={!name.trim() ||
					createCategoryMutation.isPending ||
					updateCategoryMutation.isPending}
			>
				{#if createCategoryMutation.isPending || updateCategoryMutation.isPending}
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				{category ? m["common.save"]() : m["common.create"]()}
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
