<script lang="ts">
	import { superForm } from "sveltekit-superforms";
	import { valibotClient } from "sveltekit-superforms/adapters";
	import { vehicleTypeSchema } from "$lib/schemas/vehicle-types";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { Checkbox } from "$lib/components/ui/checkbox";
	import { Button } from "$lib/components/ui/button";
	import * as m from "$lib/paraglide/messages";
	import type {
		AdminVehicleTypeResponse,
		AdminCreateVehicleTypeRequest,
		AdminUpdateVehicleTypeRequest
	} from "$lib/api/client";

	interface Props {
		vehicleType?: AdminVehicleTypeResponse;
		onSubmit: (data: AdminCreateVehicleTypeRequest | AdminUpdateVehicleTypeRequest) => void;
		submitLabel: string;
		isLoading?: boolean;
	}

	let { vehicleType, onSubmit, submitLabel }: Props = $props();

	const { form, errors, enhance, submitting } = superForm(
		{
			label: vehicleType?.label ?? "",
			maxWeightKg: vehicleType?.maxWeightKg ?? 0,
			maxDistanceKm: vehicleType?.maxDistanceKm ?? 0,
			maxLengthCm: vehicleType?.maxLengthCm ?? 0,
			maxWidthCm: vehicleType?.maxWidthCm ?? 0,
			maxHeightCm: vehicleType?.maxHeightCm ?? 0,
			needsDocuments: vehicleType?.needsDocuments ?? false
		},
		{
			validators: valibotClient(vehicleTypeSchema),
			dataType: "json",
			onSubmit({ formData, cancel }) {
				const data: AdminCreateVehicleTypeRequest | AdminUpdateVehicleTypeRequest = {
					label: formData.get("label") as string,
					maxWeightKg: Number(formData.get("maxWeightKg")),
					maxDistanceKm: Number(formData.get("maxDistanceKm")),
					maxLengthCm: Number(formData.get("maxLengthCm")),
					maxWidthCm: Number(formData.get("maxWidthCm")),
					maxHeightCm: Number(formData.get("maxHeightCm")),
					needsDocuments: formData.get("needsDocuments") === "on"
				};
				onSubmit(data);
				cancel();
			},
			resetForm: false
		}
	);
</script>

<!-- TODO: HANDLE ERRORS WITH SUPERFORMS -->
<form method="POST" use:enhance>
	<div class="grid gap-4 py-4">
		<div class="grid grid-cols-4 items-center gap-4">
			<Label for="label" class="text-right">{m["admin_vehicle_types.label"]()}</Label>
			<div class="col-span-3">
				<Input
					name="label"
					id="label"
					bind:value={$form.label}
					class="col-span-3"
					disabled={$submitting}
				/>
				{#if $errors.label}
					<div class="col-span-4 text-sm text-red-600">{$errors.label[0]}</div>
				{/if}
			</div>
		</div>

		<div class="grid grid-cols-4 items-center gap-4">
			<Label for="weight" class="text-right">{m["admin_vehicle_types.max_weight"]()}</Label>
			<div class="col-span-3">
				<Input
					name="maxWeightKg"
					id="weight"
					min="0"
					bind:value={$form.maxWeightKg}
					class="col-span-3"
					disabled={$submitting}
				/>
				{#if $errors.maxWeightKg}
					<div class="col-span-4 text-sm text-red-600">{$errors.maxWeightKg[0]}</div>
				{/if}
			</div>
		</div>

		<div class="grid grid-cols-4 items-center gap-4">
			<Label for="distance" class="text-right">{m["admin_vehicle_types.max_distance"]()}</Label>
			<div class="col-span-3">
				<Input
					name="maxDistanceKm"
					id="distance"
					min="0"
					bind:value={$form.maxDistanceKm}
					class="col-span-3"
					disabled={$submitting}
				/>
				{#if $errors.maxDistanceKm}
					<div class="col-span-4 text-sm text-red-600">{$errors.maxDistanceKm[0]}</div>
				{/if}
			</div>
		</div>

		<div class="grid grid-cols-4 items-center gap-4">
			<Label for="length" class="text-right">{m["admin_vehicle_types.max_length"]()}</Label>
			<div class="col-span-3">
				<Input
					name="maxLengthCm"
					id="length"
					min="0"
					bind:value={$form.maxLengthCm}
					class="col-span-3"
					disabled={$submitting}
				/>
				{#if $errors.maxLengthCm}
					<div class="col-span-4 text-sm text-red-600">{$errors.maxLengthCm[0]}</div>
				{/if}
			</div>
		</div>

		<div class="grid grid-cols-4 items-center gap-4">
			<Label for="width" class="text-right">{m["admin_vehicle_types.max_width"]()}</Label>
			<div class="col-span-3">
				<Input
					name="maxWidthCm"
					id="width"
					min="0"
					bind:value={$form.maxWidthCm}
					class="col-span-3"
					disabled={$submitting}
				/>
				{#if $errors.maxWidthCm}
					<div class="col-span-4 text-sm text-red-600">{$errors.maxWidthCm[0]}</div>
				{/if}
			</div>
		</div>

		<div class="grid grid-cols-4 items-center gap-4">
			<Label for="height" class="text-right">{m["admin_vehicle_types.max_height"]()}</Label>
			<div class="col-span-3">
				<Input
					name="maxHeightCm"
					id="height"
					min="0"
					bind:value={$form.maxHeightCm}
					class="col-span-3"
					disabled={$submitting}
				/>
				{#if $errors.maxHeightCm}
					<div class="col-span-4 text-sm text-red-600">{$errors.maxHeightCm[0]}</div>
				{/if}
			</div>
		</div>

		<div class="grid grid-cols-4 items-center gap-4">
			<Label for="documents" class="text-right">{m["admin_vehicle_types.needs_documents"]()}</Label>
			<div class="col-span-3">
				<Checkbox
					id="documents"
					name="needsDocuments"
					bind:checked={$form.needsDocuments}
					class="col-span-3"
					disabled={$submitting}
				/>
				{#if $errors.needsDocuments}
					<div class="col-span-4 text-sm text-red-600">{$errors.needsDocuments[0]}</div>
				{/if}
			</div>
		</div>
	</div>

	<div class="flex justify-end">
		<Button type="submit" disabled={$submitting}>
			{submitLabel}
		</Button>
	</div>
</form>
