<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import Label from "$lib/components/ui/label/label.svelte";
	import { Checkbox } from "$lib/components/ui/checkbox";
	import { createMutation, useQueryClient } from "@tanstack/svelte-query";
	import { api } from "$lib/api";
	import * as m from "$lib/paraglide/messages";
	import type {
		AdminAdminVendorResponse,
		AdminUpdateUserRequest,
		SchemaRole,
		UserStatus
	} from "$lib/api/client";
	import LoaderCircle from "@lucide/svelte/icons/loader-circle";
	import { toast } from "svelte-sonner";

	interface Props {
		vendor: AdminAdminVendorResponse;
		open: boolean;
		onOpenChange: (open: boolean) => void;
	}

	let { vendor, open, onOpenChange }: Props = $props();

	const queryClient = useQueryClient();

	let formData = $state<AdminUpdateUserRequest>({
		firstName: vendor.firstName || "",
		lastName: vendor.lastName || "",
		phone: vendor.phone || "",
		emailVerified: vendor.emailVerified || false,
		phoneVerified: vendor.phoneVerified || false,
		role: "vendor" as SchemaRole,
		status: "active" as UserStatus
	});

	$effect(() => {
		if (open) {
			formData = {
				firstName: vendor.firstName || "",
				lastName: vendor.lastName || "",
				phone: vendor.phone || "",
				emailVerified: vendor.emailVerified || false,
				phoneVerified: vendor.phoneVerified || false,
				role: "vendor" as SchemaRole,
				status: (vendor.status as UserStatus) || ("active" as UserStatus)
			};
		}
	});

	const updateVendorMutation = createMutation(() => ({
		mutationFn: async () => {
			if (!vendor.id) throw new Error("Vendor ID is required");

			// Only include fields that have changed
			const updateData: AdminUpdateUserRequest = {};
			if (formData.firstName !== vendor.firstName) updateData.firstName = formData.firstName;
			if (formData.lastName !== vendor.lastName) updateData.lastName = formData.lastName;
			if (formData.phone !== vendor.phone) updateData.phone = formData.phone;
			if (formData.emailVerified !== vendor.emailVerified)
				updateData.emailVerified = formData.emailVerified;
			if (formData.phoneVerified !== vendor.phoneVerified)
				updateData.phoneVerified = formData.phoneVerified;

			return await api.admin.adminUsersIdPatch({
				id: vendor.id,
				body: updateData
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin", "vendors"] });
			queryClient.invalidateQueries({ queryKey: ["admin", "vendor", vendor.id] });
			toast.success(m["vendors.vendor_updated"]());
			onOpenChange(false);
		},
		onError: (error) => {
			toast.error(error instanceof Error ? error.message : String(error));
		}
	}));

	function handleSubmit() {
		if (!formData.firstName || !formData.lastName) {
			toast.error(m["vendors.name_required"]());
			return;
		}
		updateVendorMutation.mutate();
	}

	function handleCancel() {
		onOpenChange(false);
	}
</script>

<Dialog.Root bind:open {onOpenChange}>
	<Dialog.Content class="max-w-md">
		<Dialog.Header>
			<Dialog.Title>{m["vendors.edit_vendor"]()}</Dialog.Title>
			<Dialog.Description>
				{m["vendors.edit_vendor_description"]()}
			</Dialog.Description>
		</Dialog.Header>

		<div class="space-y-4 py-4">
			<div class="grid grid-cols-2 gap-4">
				<div class="space-y-2">
					<Label for="firstName">{m["vendors.first_name"]()}</Label>
					<Input
						id="firstName"
						bind:value={formData.firstName}
						placeholder={m["vendors.first_name_placeholder"]()}
						required
					/>
				</div>
				<div class="space-y-2">
					<Label for="lastName">{m["vendors.last_name"]()}</Label>
					<Input
						id="lastName"
						bind:value={formData.lastName}
						placeholder={m["vendors.last_name_placeholder"]()}
						required
					/>
				</div>
			</div>

			<div class="space-y-2">
				<Label for="phone">{m["vendors.phone"]()}</Label>
				<Input
					id="phone"
					bind:value={formData.phone}
					placeholder={m["vendors.phone_placeholder"]()}
				/>
			</div>

			<div>
				<Label>{m["users.verification"]()}</Label>
				<div class="mt-2 space-y-2">
					<div class="flex items-center space-x-2">
						<Checkbox bind:checked={formData.emailVerified} id="emailVerified" />
						<Label for="emailVerified" class="text-sm font-normal">
							{m["vendors.email_verified"]()}
						</Label>
					</div>
					<div class="flex items-center space-x-2">
						<Checkbox bind:checked={formData.phoneVerified} id="phoneVerified" />
						<Label for="phoneVerified" class="text-sm font-normal">
							{m["vendors.phone_verified"]()}
						</Label>
					</div>
				</div>
			</div>
		</div>

		<div class="flex justify-end space-x-2 pt-4">
			<Button variant="outline" onclick={handleCancel} disabled={updateVendorMutation.isPending}>
				{m["common.cancel"]()}
			</Button>
			<Button onclick={handleSubmit} disabled={updateVendorMutation.isPending}>
				{#if updateVendorMutation.isPending}
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				{m["common.save"]()}
			</Button>
		</div>
	</Dialog.Content>
</Dialog.Root>
