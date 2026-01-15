<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import { Button } from "$lib/components/ui/button";
	import { createMutation, useQueryClient } from "@tanstack/svelte-query";
	import { api } from "$lib/api";
	import * as m from "$lib/paraglide/messages";
	import VehicleTypeForm from "./vehicle-type-form.svelte";
	import type { AdminVehicleTypeResponse, AdminUpdateVehicleTypeRequest } from "$lib/api/client";

	interface Props {
		vehicleType: AdminVehicleTypeResponse;
		open: boolean;
		onOpenChange: (open: boolean) => void;
	}

	let { vehicleType, open, onOpenChange }: Props = $props();

	const queryClient = useQueryClient();

	const updateVehicleTypeMutation = createMutation(() => ({
		mutationFn: async (data: AdminUpdateVehicleTypeRequest) => {
			if (!vehicleType.id) throw new Error("Vehicle type ID is required");
			return await api.admin.adminVehicleTypesIdPut({
				id: vehicleType.id,
				vehicleType: data
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin", "vehicleTypes"] });
			onOpenChange(false);
		}
	}));

	function handleSubmit(data: AdminUpdateVehicleTypeRequest) {
		console.log("Submitting update:", data);
		updateVehicleTypeMutation.mutate(data);
	}
</script>

<Dialog.Root bind:open {onOpenChange}>
	<Dialog.Content class="max-h-[80vh] max-w-lg overflow-y-auto">
		<Dialog.Header>
			<Dialog.Title>{m["admin_vehicle_types.edit_dialog_title"]()}</Dialog.Title>
			<Dialog.Description>
				{m["admin_vehicle_types.edit_dialog_description"]()}
			</Dialog.Description>
		</Dialog.Header>

		<VehicleTypeForm
			{vehicleType}
			onSubmit={handleSubmit}
			submitLabel={updateVehicleTypeMutation.isPending
				? m["admin_vehicle_types.updating"]()
				: m["admin_vehicle_types.update"]()}
			isLoading={updateVehicleTypeMutation.isPending}
		/>
	</Dialog.Content>
</Dialog.Root>
