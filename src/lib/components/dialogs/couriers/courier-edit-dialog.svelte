<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import Label from "$lib/components/ui/label/label.svelte";
	import { Checkbox } from "$lib/components/ui/checkbox";
	import * as Select from "$lib/components/ui/select";
	import { createMutation, useQueryClient } from "@tanstack/svelte-query";
	import { api } from "$lib/api";
	import * as m from "$lib/paraglide/messages";
	import type {
		AdminAdminCourierResponse,
		AdminUpdateUserRequest,
		SchemaRole,
		UserStatus
	} from "$lib/api/client";
	import LoaderCircle from "@lucide/svelte/icons/loader-circle";
	import { toast } from "svelte-sonner";

	interface Props {
		courier: AdminAdminCourierResponse;
		open: boolean;
		onOpenChange: (open: boolean) => void;
	}

	let { courier, open, onOpenChange }: Props = $props();

	const queryClient = useQueryClient();

	let formData = $state<AdminUpdateUserRequest>({
		firstName: courier.firstName || "",
		lastName: courier.lastName || "",
		phone: courier.phone || "",
		emailVerified: courier.emailVerified || false,
		phoneVerified: courier.phoneVerified || false,
		role: "courier" as SchemaRole,
		status: "active" as UserStatus
	});

	$effect(() => {
		if (open) {
			formData = {
				firstName: courier.firstName || "",
				lastName: courier.lastName || "",
				phone: courier.phone || "",
				emailVerified: courier.emailVerified || false,
				phoneVerified: courier.phoneVerified || false,
				role: "courier" as SchemaRole,
				status: (courier.status as UserStatus) || ("active" as UserStatus)
			};
		}
	});

	const updateCourierMutation = createMutation(() => ({
		mutationFn: async () => {
			if (!courier.id) throw new Error("Courier ID is required");

			// Only include fields that have changed
			const updateData: AdminUpdateUserRequest = {};
			if (formData.firstName !== courier.firstName) updateData.firstName = formData.firstName;
			if (formData.lastName !== courier.lastName) updateData.lastName = formData.lastName;
			if (formData.phone !== courier.phone) updateData.phone = formData.phone;
			if (formData.emailVerified !== courier.emailVerified)
				updateData.emailVerified = formData.emailVerified;
			if (formData.phoneVerified !== courier.phoneVerified)
				updateData.phoneVerified = formData.phoneVerified;

			return await api.admin.adminUsersIdPatch({
				id: courier.id,
				body: updateData
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin", "couriers"] });
			queryClient.invalidateQueries({ queryKey: ["admin", "courier", courier.id] });
			toast.success(m["couriers.courier_updated"]());
			onOpenChange(false);
		},
		onError: (error) => {
			toast.error(error instanceof Error ? error.message : String(error));
		}
	}));

	function handleSubmit() {
		if (!formData.firstName || !formData.lastName) {
			toast.error(m["couriers.name_required"]());
			return;
		}
		updateCourierMutation.mutate();
	}

	function handleCancel() {
		onOpenChange(false);
	}
</script>

<Dialog.Root bind:open {onOpenChange}>
	<Dialog.Content class="max-w-md">
		<Dialog.Header>
			<Dialog.Title>{m["couriers.edit_courier"]()}</Dialog.Title>
			<Dialog.Description>
				{m["couriers.edit_courier_description"]()}
			</Dialog.Description>
		</Dialog.Header>

		<div class="space-y-4 py-4">
			<div class="grid grid-cols-2 gap-4">
				<div class="space-y-2">
					<Label for="firstName">{m["couriers.first_name"]()}</Label>
					<Input
						id="firstName"
						bind:value={formData.firstName}
						placeholder={m["couriers.first_name_placeholder"]()}
						required
					/>
				</div>
				<div class="space-y-2">
					<Label for="lastName">{m["couriers.last_name"]()}</Label>
					<Input
						id="lastName"
						bind:value={formData.lastName}
						placeholder={m["couriers.last_name_placeholder"]()}
						required
					/>
				</div>
			</div>

			<div class="space-y-2">
				<Label for="phone">{m["couriers.phone"]()}</Label>
				<Input
					id="phone"
					bind:value={formData.phone}
					placeholder={m["couriers.phone_placeholder"]()}
				/>
			</div>

			<div>
				<Label>{m["users.verification"]()}</Label>
				<div class="mt-2 space-y-2">
					<div class="flex items-center space-x-2">
						<Checkbox bind:checked={formData.emailVerified} id="emailVerified" />
						<Label for="emailVerified" class="text-sm font-normal">
							{m["couriers.email_verified"]()}
						</Label>
					</div>
					<div class="flex items-center space-x-2">
						<Checkbox bind:checked={formData.phoneVerified} id="phoneVerified" />
						<Label for="phoneVerified" class="text-sm font-normal">
							{m["couriers.phone_verified"]()}
						</Label>
					</div>
				</div>
			</div>
		</div>

		<div class="flex justify-end space-x-2 pt-4">
			<Button variant="outline" onclick={handleCancel} disabled={updateCourierMutation.isPending}>
				{m["common.cancel"]()}
			</Button>
			<Button onclick={handleSubmit} disabled={updateCourierMutation.isPending}>
				{#if updateCourierMutation.isPending}
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				{m["common.save"]()}
			</Button>
		</div>
	</Dialog.Content>
</Dialog.Root>
