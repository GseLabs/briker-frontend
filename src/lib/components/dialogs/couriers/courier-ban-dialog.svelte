<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import { Button } from "$lib/components/ui/button";
	import { Alert, AlertDescription } from "$lib/components/ui/alert";
	import { createMutation, useQueryClient } from "@tanstack/svelte-query";
	import { api } from "$lib/api";
	import * as m from "$lib/paraglide/messages";
	import type { AdminAdminCourierResponse, AdminUpdateUserRequest } from "$lib/api/client";
	import AlertTriangleIcon from "@lucide/svelte/icons/alert-triangle";
	import LoaderCircle from "@lucide/svelte/icons/loader-circle";
	import { toast } from "svelte-sonner";

	interface Props {
		courier: AdminAdminCourierResponse;
		open: boolean;
		onOpenChange: (open: boolean) => void;
	}

	let { courier, open, onOpenChange }: Props = $props();

	const queryClient = useQueryClient();

	const banCourierMutation = createMutation(() => ({
		mutationFn: async () => {
			if (!courier.id) throw new Error("Courier ID is required");

			const updateData: AdminUpdateUserRequest = {
				status: "banned"
			};

			return await api.admin.adminUsersIdPatch({
				id: courier.id,
				body: updateData
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin", "couriers"] });
			queryClient.invalidateQueries({ queryKey: ["admin", "courier", courier.id] });
			toast.success(m["couriers.courier_banned"]());
			onOpenChange(false);
		},
		onError: (error) => {
			toast.error(error instanceof Error ? error.message : String(error));
		}
	}));

	function handleBan() {
		banCourierMutation.mutate();
	}

	function handleCancel() {
		onOpenChange(false);
	}

	const courierName = $derived(
		[courier.firstName, courier.lastName].filter(Boolean).join(" ") || courier.email || "Ce livreur"
	);
</script>

<Dialog.Root bind:open {onOpenChange}>
	<Dialog.Content class="max-w-md">
		<Dialog.Header>
			<Dialog.Title class="flex items-center gap-2 text-red-600">
				<AlertTriangleIcon class="h-5 w-5" />
				{m["couriers.ban_courier_title"]()}
			</Dialog.Title>
			<Dialog.Description>
				{m["couriers.ban_courier_description"]({ name: courierName })}
			</Dialog.Description>
		</Dialog.Header>

		<div class="space-y-4">
			<!-- Courier info -->
			<div class="rounded-lg bg-gray-50 p-4">
				<h4 class="mb-2 font-medium">{m["couriers.courier_information"]()}:</h4>
				<div class="space-y-1 text-sm">
					<div>
						<span class="font-medium">{m["users.name"]()}:</span>
						{courierName}
					</div>
					<div>
						<span class="font-medium">{m["users.email"]()}:</span>
						{courier.email || m["common.na"]()}
					</div>
					<div>
						<span class="font-medium">{m["couriers.phone"]()}:</span>
						{courier.phone || m["common.na"]()}
					</div>
					<div>
						<span class="font-medium">{m["couriers.current_status"]()}:</span>
						<span
							class="ml-1 inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800"
						>
							{courier.status ? m[`couriers.${courier.status}`]() : m["common.unknown"]()}
						</span>
					</div>
				</div>
			</div>

			<!-- Consequences -->
			<div class="text-sm text-gray-600">
				<p class="mb-1 font-medium">{m["couriers.ban_consequences"]()}:</p>
				<ul class="list-inside list-disc space-y-1 text-xs">
					<li>{m["couriers.ban_consequence_1"]()}</li>
					<li>{m["couriers.ban_consequence_2"]()}</li>
					<li>{m["couriers.ban_consequence_3"]()}</li>
				</ul>
			</div>
		</div>

		<div class="flex justify-end space-x-2 pt-4">
			<Button variant="outline" onclick={handleCancel} disabled={banCourierMutation.isPending}>
				{m["common.cancel"]()}
			</Button>
			<Button variant="destructive" onclick={handleBan} disabled={banCourierMutation.isPending}>
				{#if banCourierMutation.isPending}
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				{m["couriers.ban_courier"]()}
			</Button>
		</div>
	</Dialog.Content>
</Dialog.Root>
