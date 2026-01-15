<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import * as Tabs from "$lib/components/ui/tabs";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import { createMutation, createQuery, useQueryClient } from "@tanstack/svelte-query";
	import { api } from "$lib/api";
	import * as m from "$lib/paraglide/messages";
	import EyeIcon from "@lucide/svelte/icons/eye";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import CheckIcon from "@lucide/svelte/icons/check";
	import XIcon from "@lucide/svelte/icons/x";
	import LoaderCircle from "@lucide/svelte/icons/loader-circle";
	import DownloadIcon from "@lucide/svelte/icons/download";
	import UserIcon from "@lucide/svelte/icons/user";
	import FileCheckIcon from "@lucide/svelte/icons/file-check";
	import ClockIcon from "@lucide/svelte/icons/clock";
	import type { AdminAdminCourierResponse, AdminCourierDocument } from "$lib/api/client";
	import Label from "$lib/components/ui/label/label.svelte";
	import { toast } from "svelte-sonner";
	import { getDocumentTypeLabel } from "$lib/utils/document-translations";
	import DocumentViewerDialog from "$lib/components/dialogs/documents/document-viewer-dialog.svelte";

	interface Props {
		courier: AdminAdminCourierResponse;
		open: boolean;
		onOpenChange: (open: boolean) => void;
	}

	let { courier, open, onOpenChange }: Props = $props();

	const queryClient = useQueryClient();
	let activeTab = $state("profile");

	const courierDetailsQuery = createQuery(() => ({
		queryKey: ["admin", "courier", courier.id],
		queryFn: async () => {
			const response = await api.admin.adminCouriersIdGet({ id: courier.id! });
			return response;
		},
		enabled: open
	}));

	const approveMutation = createMutation(() => ({
		mutationFn: async () => {
			if (!courierDetails?.emailVerified) {
				throw new Error(m["couriers.email_not_verified"]());
			}

			return await api.admin.adminCouriersIdApprovePost({ id: courier.id! });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin", "couriers"] });
			toast.success(m["couriers.approved"]());
			onOpenChange(false);
		},
		onError: (error) => {
			toast.error(error instanceof Error ? error.message : String(error));
		}
	}));

	const rejectMutation = createMutation(() => ({
		mutationFn: async () => {
			return await api.admin.adminCouriersIdDenyPost({ id: courier.id! });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin", "couriers"] });
			onOpenChange(false);
		}
	}));

	const courierDetails = $derived(courierDetailsQuery.data);
	const loading = $derived(courierDetailsQuery.isLoading);

	function getStatusColor(status?: string): string {
		const colors = {
			pending_approval: "bg-yellow-100 text-yellow-800",
			approved: "bg-green-100 text-green-800",
			active: "bg-blue-100 text-blue-800",
			rejected: "bg-red-100 text-red-800",
			suspended: "bg-orange-100 text-orange-800",
			banned: "bg-gray-100 text-gray-800"
		};
		return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
	}

	function getVerificationColor(emailVerified?: boolean, phoneVerified?: boolean): string {
		if (emailVerified && phoneVerified) return "bg-green-100 text-green-800";
		if (emailVerified || phoneVerified) return "bg-yellow-100 text-yellow-800";
		return "bg-red-100 text-red-800";
	}

	async function downloadDocument(courierDocument: AdminCourierDocument) {
		if (!courierDocument.type || !courier.id) return;

		try {
			const blob = await api.admin.adminCouriersIdDocumentsTypeGet({
				id: courier.id,
				type: courierDocument.type
			});

			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `${courierDocument.type.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.pdf`;
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		} catch (error) {
			console.error("Error downloading document:", error);
		}
	}

	let showDocumentDialog = $state(false);
	let selectedDocument = $state<AdminCourierDocument | null>(null);

	function viewDocument(courierDocument: AdminCourierDocument) {
		selectedDocument = courierDocument;
		showDocumentDialog = true;
	}

	const statusMessages: Record<string, () => string> = {
		pending_approval: m["couriers.pending_approval"],
		approved: m["couriers.approved"],
		active: m["couriers.active"],
		rejected: m["couriers.rejected"],
		suspended: m["couriers.suspended"],
		banned: m["couriers.banned"]
	};
</script>

<Dialog.Root bind:open {onOpenChange}>
	<Dialog.Content
		class="mx-auto max-h-[90vh] w-full overflow-y-auto max-sm:mx-2 max-sm:h-screen max-sm:max-w-full max-sm:rounded-none md:!max-w-6/7"
	>
		<Dialog.Header class="max-sm:px-4 max-sm:pt-4">
			<Dialog.Title class="text-lg sm:text-xl">{m["couriers.approval_title"]()}</Dialog.Title>
			<Dialog.Description class="text-sm sm:text-base">
				{m["couriers.approval_description"]()}
			</Dialog.Description>
		</Dialog.Header>

		{#if loading}
			<div class="flex items-center justify-center py-12">
				<LoaderCircle class="h-8 w-8 animate-spin" />
				<span class="ml-2">{m["common.loading"]()}</span>
			</div>
		{:else if courierDetails}
			<!-- Status and Verification -->
			<div class="mb-6 flex flex-wrap gap-2">
				<Badge class={getStatusColor(courierDetails.status)}>
					{statusMessages[courierDetails.status || ""]?.() || m["common.unknown"]()}
				</Badge>
				<Badge
					class={getVerificationColor(courierDetails.emailVerified, courierDetails.phoneVerified)}
				>
					{courierDetails.emailVerified && courierDetails.phoneVerified
						? m["common.verified"]()
						: courierDetails.emailVerified || courierDetails.phoneVerified
							? m["common.partial"]()
							: m["common.unverified"]()}
				</Badge>
			</div>

			<!-- Tabs -->
			<Tabs.Root bind:value={activeTab} class="w-full">
				<Tabs.List class="w-full">
					<Tabs.Trigger value="profile">
						<UserIcon class="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
						<span class="truncate">{m["couriers.personal_info"]()}</span>
					</Tabs.Trigger>
					<Tabs.Trigger
						value="documents"
						class="flex min-w-0 items-center justify-start gap-2 px-2 py-2 text-xs sm:justify-center sm:px-3 sm:py-2 sm:text-sm"
					>
						<FileCheckIcon class="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
						<span class="truncate">{m["couriers.documents"]()}</span>
					</Tabs.Trigger>
					<Tabs.Trigger
						value="history"
						class="flex min-w-0 items-center justify-start gap-2 px-2 py-2 text-xs sm:justify-center sm:px-3 sm:py-2 sm:text-sm"
					>
						<ClockIcon class="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
						<span class="truncate">{m["couriers.additional_info"]()}</span>
					</Tabs.Trigger>
				</Tabs.List>

				<Tabs.Content value="profile" class="mt-4 sm:mt-6">
					<div class="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
						<div>
							<h3 class="mb-4 text-lg font-semibold">{m["couriers.personal_info"]()}</h3>
							<div class="space-y-4">
								<div>
									<Label class="text-sm font-medium text-gray-500">{m["couriers.name"]()}</Label>
									<p class="text-sm font-medium break-words">
										{[courierDetails.firstName, courierDetails.lastName]
											.filter(Boolean)
											.join(" ") || m["common.na"]()}
									</p>
								</div>
								<div>
									<Label class="text-sm font-medium text-gray-500">{m["couriers.email"]()}</Label>
									<p class="text-sm break-all lowercase">
										{courierDetails.email || m["common.na"]()}
									</p>
								</div>
								<div>
									<Label class="text-sm font-medium text-gray-500">{m["couriers.phone"]()}</Label>
									<p class="text-sm break-words">{courierDetails.phone || m["common.na"]()}</p>
								</div>
								<div>
									<Label class="text-sm font-medium text-gray-500"
										>{m["couriers.vehicle_type"]()}</Label
									>
									<p class="text-sm break-words">
										{courierDetails.vehicleType?.label || m["common.na"]()}
									</p>
								</div>
							</div>
						</div>

						<div>
							<h3 class="mb-4 text-lg font-semibold">{m["couriers.verification"]()}</h3>
							<div class="space-y-3">
								<div class="flex items-center justify-between rounded-lg border p-3">
									<span class="text-sm font-medium">Email</span>
									<Badge
										class={courierDetails.emailVerified
											? "bg-green-100 text-green-800"
											: "bg-red-100 text-red-800"}
									>
										{courierDetails.emailVerified
											? m["common.verified"]()
											: m["common.unverified"]()}
									</Badge>
								</div>
								<div class="flex items-center justify-between rounded-lg border p-3">
									<span class="text-sm font-medium">Téléphone</span>
									<Badge
										class={courierDetails.phoneVerified
											? "bg-green-100 text-green-800"
											: "bg-red-100 text-red-800"}
									>
										{courierDetails.phoneVerified
											? m["common.verified"]()
											: m["common.unverified"]()}
									</Badge>
								</div>
							</div>
						</div>
					</div>
				</Tabs.Content>

				<Tabs.Content value="documents" class="mt-4 sm:mt-6">
					{#if courierDetails.documents && courierDetails.documents.length > 0}
						<div class="space-y-2">
							{#each courierDetails.documents as document (document.type)}
								<div
									class="flex items-center justify-between border-b border-gray-100 p-3 transition-colors last:border-b-0 hover:bg-gray-50"
								>
									<div class="flex min-w-0 flex-1 items-center gap-3">
										<FileTextIcon class="h-4 w-4 flex-shrink-0 text-gray-400" />
										<span class="truncate text-sm font-medium text-gray-900">
											{getDocumentTypeLabel(document.type!) || document.type}
										</span>
									</div>
									<div class="ml-4 flex items-center gap-2">
										<button
											onclick={() => viewDocument(document)}
											class="rounded-lg p-2 text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
											title={m["common.view"]()}
										>
											<EyeIcon class="h-4 w-4" />
										</button>
										<button
											onclick={() => downloadDocument(document)}
											class="rounded-lg p-2 text-gray-600 transition-colors hover:bg-green-50 hover:text-green-600"
											title={m["common.download"]()}
										>
											<DownloadIcon class="h-4 w-4" />
										</button>
									</div>
								</div>
							{/each}
						</div>
					{:else}
						<div class="py-8 text-center text-gray-500">
							<FileTextIcon class="mx-auto mb-4 h-12 w-12 text-gray-300" />
							<p>{m["couriers.no_documents_provided"]()}</p>
						</div>
					{/if}
				</Tabs.Content>

				<Tabs.Content value="history" class="mt-4 sm:mt-6">
					<div class="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
						<div>
							<h3 class="mb-4 text-lg font-semibold">{m["couriers.account_information"]()}</h3>
							<div class="space-y-4">
								<div>
									<Label class="text-sm font-medium text-gray-500"
										>{m["couriers.created_at"]()}</Label
									>
									<p class="text-sm break-words">
										{courierDetails.createdAt
											? new Date(courierDetails.createdAt).toLocaleDateString()
											: m["common.na"]()}
									</p>
								</div>
								<div>
									<Label class="text-sm font-medium text-gray-500"
										>{m["couriers.updated_at"]()}</Label
									>
									<p class="text-sm break-words">
										{courierDetails.updatedAt
											? new Date(courierDetails.updatedAt).toLocaleDateString()
											: m["common.na"]()}
									</p>
								</div>
								<div>
									<Label class="text-sm font-medium text-gray-500"
										>{m["couriers.courier_id"]()}</Label
									>
									<p class="font-mono text-sm break-all">{courierDetails.id || m["common.na"]()}</p>
								</div>
							</div>
						</div>

						<div>
							{#if courierDetails.status === "pending_approval"}
								<h3 class="mb-4 text-lg font-semibold">{m["couriers.account_status"]()}</h3>
								<div class="rounded-lg border p-4">
									<p class="mt-2 text-sm text-gray-600">
										{m["couriers.pending_approval_description"]()}
									</p>
								</div>
							{:else}
								<h3 class="mb-4 text-lg font-semibold">{m["couriers.payment_information"]()}</h3>
								<div class="rounded-lg border p-4">
									<div class="space-y-3">
										<div>
											<Label class="text-sm font-medium text-gray-500"
												>{m["couriers.stripe_status"]()}</Label
											>
											<p class="font-medium">
												{#if courierDetails.stripeActive}
													<span class="text-green-600">Actif</span>
												{:else}
													<span class="text-red-600">Inactif</span>
												{/if}
											</p>
										</div>
										<div>
											<Label class="text-sm font-medium text-gray-500"
												>{m["couriers.stripe_account_id"]()}</Label
											>
											<p class="font-mono text-sm break-all">
												{courierDetails.stripeAccountId || m["common.na"]()}
											</p>
										</div>
									</div>
								</div>
							{/if}
						</div>
					</div>
				</Tabs.Content>
			</Tabs.Root>

			<!-- Action Buttons -->
			{#if courierDetails.status === "pending_approval"}
				<Dialog.Footer>
					<Button
						variant="outline"
						onclick={() => rejectMutation.mutate()}
						disabled={rejectMutation.isPending}
						class="text-red-600 hover:bg-red-50 hover:text-red-700"
					>
						{#if rejectMutation.isPending}
							<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
						{/if}
						<XIcon class="mr-2 h-4 w-4" />
						{m["common.reject"]()}
					</Button>
					<Button
						onclick={() => approveMutation.mutate()}
						disabled={approveMutation.isPending}
						class="bg-green-600 text-white hover:bg-green-700"
					>
						{#if approveMutation.isPending}
							<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
						{/if}
						<CheckIcon class="mr-2 h-4 w-4" />
						{m["common.approve"]()}
					</Button>
				</Dialog.Footer>
			{:else}
				<Dialog.Footer>
					<Button variant="outline" onclick={() => onOpenChange(false)}>
						{m["common.close"]()}
					</Button>
				</Dialog.Footer>
			{/if}
		{/if}
	</Dialog.Content>
</Dialog.Root>

<!-- Document Viewer Dialog -->
<DocumentViewerDialog
	bind:open={showDocumentDialog}
	onOpenChange={(open) => (showDocumentDialog = open)}
	document={selectedDocument}
	onDownload={downloadDocument}
	entityType="courier"
	entityId={courier.id ?? ""}
/>
