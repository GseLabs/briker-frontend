<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import { Button } from "$lib/components/ui/button";
	import { createMutation, useQueryClient } from "@tanstack/svelte-query";
	import { api } from "$lib/api";
	import * as m from "$lib/paraglide/messages";
	import type { AdminAdminVendorResponse, AdminUpdateUserRequest } from "$lib/api/client";
	import AlertTriangleIcon from "@lucide/svelte/icons/alert-triangle";
	import LoaderCircle from "@lucide/svelte/icons/loader-circle";
	import { toast } from "svelte-sonner";

	interface Props {
		vendor: AdminAdminVendorResponse;
		open: boolean;
		onOpenChange: (open: boolean) => void;
	}

	let { vendor, open, onOpenChange }: Props = $props();

	const queryClient = useQueryClient();

	const banVendorMutation = createMutation(() => ({
		mutationFn: async () => {
			if (!vendor.id) throw new Error("Vendor ID is required");

			const updateData: AdminUpdateUserRequest = {
				status: "banned"
			};

			return await api.admin.adminUsersIdPatch({
				id: vendor.id,
				body: updateData
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin", "vendors"] });
			queryClient.invalidateQueries({ queryKey: ["admin", "vendor", vendor.id] });
			toast.success(m["vendors.vendor_banned"]());
			onOpenChange(false);
		},
		onError: (error) => {
			toast.error(error instanceof Error ? error.message : String(error));
		}
	}));

	function handleBan() {
		banVendorMutation.mutate();
	}

	function handleCancel() {
		onOpenChange(false);
	}

	const vendorName = $derived(
		[vendor.firstName, vendor.lastName].filter(Boolean).join(" ") ||
			vendor.businessName ||
			vendor.email ||
			m["vendors.title"]()
	);
</script>

<Dialog.Root bind:open {onOpenChange}>
	<Dialog.Content class="max-w-md">
		<Dialog.Header>
			<Dialog.Title class="flex items-center gap-2 text-red-600">
				<AlertTriangleIcon class="h-5 w-5" />
				{m["vendors.ban_vendor_title"]()}
			</Dialog.Title>
			<Dialog.Description>
				{m["vendors.ban_vendor_description"]({ name: vendorName })}
			</Dialog.Description>
		</Dialog.Header>

		<div class="space-y-4">
			<!-- Vendor info -->
			<div class="rounded-lg bg-gray-50 p-4">
				<h4 class="mb-2 font-medium">{m["vendors.vendor_information"]()}:</h4>
				<div class="space-y-1 text-sm">
					<div>
						<span class="font-medium">{m["common.name"]()}:</span>
						{vendorName}
					</div>
					<div>
						<span class="font-medium">{m["vendors.business_name"]()}:</span>
						{vendor.businessName}
					</div>
					<div>
						<span class="font-medium">{m["common.email"]()}:</span>
						{vendor.email || m["common.na"]()}
					</div>
					<div>
						<span class="font-medium">{m["vendors.phone"]()}:</span>
						{vendor.phone || m["common.na"]()}
					</div>
					<div>
						<span class="font-medium">{m["vendors.current_status"]()}:</span>
						<span
							class="ml-1 inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800"
						>
							{vendor.status
								? m[`vendors.${vendor.status}`]() || vendor.status
								: m["common.unknown"]()}
						</span>
					</div>
				</div>
			</div>

			<!-- Consequences -->
			<div class="text-sm text-gray-600">
				<p class="mb-1 font-medium">{m["vendors.ban_consequences"]()}:</p>
				<ul class="list-inside list-disc space-y-1 text-xs">
					<li>{m["vendors.ban_consequence_1"]()}</li>
					<li>{m["vendors.ban_consequence_2"]()}</li>
					<li>{m["vendors.ban_consequence_3"]()}</li>
				</ul>
			</div>
		</div>

		<div class="flex justify-end space-x-2 pt-4">
			<Button variant="outline" onclick={handleCancel} disabled={banVendorMutation.isPending}>
				{m["common.cancel"]()}
			</Button>
			<Button variant="destructive" onclick={handleBan} disabled={banVendorMutation.isPending}>
				{#if banVendorMutation.isPending}
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				{m["vendors.ban_vendor"]()}
			</Button>
		</div>
	</Dialog.Content>
</Dialog.Root>
