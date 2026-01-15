<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import { Button } from "$lib/components/ui/button";
	import { AlertTriangle } from "@lucide/svelte";
	import { createMutation, useQueryClient } from "@tanstack/svelte-query";
	import { api } from "$lib/api";
	import * as m from "$lib/paraglide/messages";
	import type { RoutesProductResponse } from "$lib/api/client";
	import LoaderCircle from "@lucide/svelte/icons/loader-circle";
	import { toast } from "svelte-sonner";

	interface Props {
		product: RoutesProductResponse;
		open: boolean;
		onOpenChange: (open: boolean) => void;
		onSuccess: () => void;
	}

	let { product, open = $bindable(), onOpenChange, onSuccess }: Props = $props();

	const queryClient = useQueryClient();

	const deleteProductMutation = createMutation(() => ({
		mutationFn: async () => {
			return await api.vendor.vendorProductsIdDelete({
				id: product.id as string
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["vendor", "products"] });
			toast.success(m["products.delete_success"]());
			onOpenChange(false);
			onSuccess();
		},
		onError: (error) => {
			toast.error(error instanceof Error ? error.message : String(error));
		}
	}));

	function handleDelete() {
		deleteProductMutation.mutate();
	}

	function handleCancel() {
		onOpenChange(false);
	}

	const isLoading = $derived(deleteProductMutation.isPending);
</script>

<Dialog.Root bind:open {onOpenChange}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title class="flex items-center gap-2 text-destructive">
				<AlertTriangle class="h-5 w-5" />
				{m["products.delete_title"]()}
			</Dialog.Title>
			<Dialog.Description>
				{m["products.delete_description"]({ name: product.name || "" })}
			</Dialog.Description>
		</Dialog.Header>

		<Dialog.Footer>
			<Button variant="outline" onclick={handleCancel} disabled={isLoading}>
				{m["common.cancel"]()}
			</Button>
			<Button variant="destructive" onclick={handleDelete} disabled={isLoading}>
				{#if isLoading}
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				{m["products.confirm_delete"]()}
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
