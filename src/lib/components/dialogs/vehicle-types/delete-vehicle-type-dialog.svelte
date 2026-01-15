<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import { Button } from "$lib/components/ui/button";
	import { createMutation, useQueryClient } from "@tanstack/svelte-query";
	import { api } from "$lib/api";
	import * as m from "$lib/paraglide/messages";
	import type { AdminVehicleTypeResponse } from "$lib/api/client";

	interface Props {
		vehicleType: AdminVehicleTypeResponse;
		open: boolean;
		onOpenChange: (open: boolean) => void;
	}

	let { vehicleType, open, onOpenChange }: Props = $props();

	const queryClient = useQueryClient();

	const deleteVehicleTypeMutation = createMutation(() => ({
		mutationFn: async () => {
			if (!vehicleType.id) throw new Error("Vehicle type ID is required");
			return await api.admin.adminVehicleTypesIdDelete({
				id: vehicleType.id
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin", "vehicleTypes"] });
			onOpenChange(false);
		}
	}));

	function handleDelete() {
		deleteVehicleTypeMutation.mutate();
	}
</script>

<Dialog.Root bind:open {onOpenChange}>
	<Dialog.Content class="max-w-md">
		<Dialog.Header>
			<Dialog.Title>{m["admin_vehicle_types.delete_dialog_title"]()}</Dialog.Title>
			<Dialog.Description>
				{m["admin_vehicle_types.delete_dialog_description"]({ label: vehicleType.label || "" })}
			</Dialog.Description>
		</Dialog.Header>

		<div class="flex justify-end space-x-2 pt-4">
			<Button
				variant="outline"
				onclick={() => onOpenChange(false)}
				disabled={deleteVehicleTypeMutation.isPending}
			>
				{m["common.cancel"]()}
			</Button>
			<Button
				variant="destructive"
				onclick={handleDelete}
				disabled={deleteVehicleTypeMutation.isPending}
			>
				{deleteVehicleTypeMutation.isPending
					? m["admin_vehicle_types.deleting"]()
					: m["admin_vehicle_types.delete"]()}
			</Button>
		</div>
	</Dialog.Content>
</Dialog.Root>
