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
	import type { AdminAdminVendorResponse, AdminVendorDocument } from "$lib/api/client";
	import Label from "$lib/components/ui/label/label.svelte";
	import { toast } from "svelte-sonner";
	import { getDocumentTypeLabel } from "$lib/utils/document-translations";
	import DocumentViewerDialog from "$lib/components/dialogs/documents/document-viewer-dialog.svelte";

	interface Props {
		vendor: AdminAdminVendorResponse;
		open: boolean;
		onOpenChange: (open: boolean) => void;
	}

	let { vendor, open, onOpenChange }: Props = $props();

	const queryClient = useQueryClient();
	let activeTab = $state("profile");
	let showDocumentDialog = $state(false);
	let selectedDocument = $state<AdminVendorDocument | null>(null);

	const vendorDetailsQuery = createQuery(() => ({
		queryKey: ["admin", "vendor", vendor.id],
		queryFn: async () => {
			const response = await api.admin.adminVendorsIdGet({ id: vendor.id! });
			return response;
		},
		enabled: open
	}));

	const approveMutation = createMutation(() => ({
		mutationFn: async () => {
			if (!vendorDetails?.emailVerified) {
				throw new Error(m["vendors.email_not_verified"]());
			}

			return await api.admin.adminVendorsIdApprovePost({ id: vendor.id! });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin", "vendors"] });
			toast.success(m["vendors.approved"]());
			onOpenChange(false);
		},
		onError: (error) => {
			toast.error(error instanceof Error ? error.message : String(error));
		}
	}));

	const rejectMutation = createMutation(() => ({
		mutationFn: async () => {
			return await api.admin.adminVendorsIdDenyPost({ id: vendor.id! });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin", "vendors"] });
			toast.success(m["vendors.rejected"]());
			onOpenChange(false);
		},
		onError: (error) => {
			toast.error(error instanceof Error ? error.message : String(error));
		}
	}));

	const vendorDetails = $derived(vendorDetailsQuery.data);
	const loading = $derived(vendorDetailsQuery.isLoading);

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

	async function downloadDocument(vendorDocument: AdminVendorDocument) {
		if (!vendorDocument.type || !vendor.id) return;

		try {
			const blob = await api.admin.adminVendorsIdDocumentsTypeGet({
				id: vendor.id,
				type: vendorDocument.type
			});

			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `${vendorDocument.type.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.pdf`;
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		} catch (error) {
			console.error("Error downloading document:", error);
		}
	}

	function viewDocument(vendorDocument: AdminVendorDocument) {
		selectedDocument = vendorDocument;
		showDocumentDialog = true;
	}
</script>

<Dialog.Root bind:open {onOpenChange}>
	<Dialog.Content class="max-h-[90vh] !max-w-6/7 overflow-y-auto max-sm:max-w-full">
		<Dialog.Header class="max-sm:px-4 max-sm:pt-4">
			<Dialog.Title class="text-lg sm:text-xl">{m["vendors.approval_title"]()}</Dialog.Title>
			<Dialog.Description class="text-sm sm:text-base">
				{m["vendors.approval_description"]()}
			</Dialog.Description>
		</Dialog.Header>

		{#if loading}
			<div class="flex items-center justify-center py-8">
				<LoaderCircle class="h-6 w-6 animate-spin" />
			</div>
		{:else if vendorDetails}
			<!-- Status and Verification -->
			<div class="mb-6 flex flex-wrap gap-2">
				<Badge class={getStatusColor(vendorDetails.status)}>
					{vendorDetails.status ? vendorDetails.status : m["common.unknown"]()}
				</Badge>
				<Badge
					class={getVerificationColor(vendorDetails.emailVerified, vendorDetails.phoneVerified)}
				>
					{vendorDetails.emailVerified && vendorDetails.phoneVerified
						? m["common.verified"]()
						: vendorDetails.emailVerified || vendorDetails.phoneVerified
							? m["common.partial"]()
							: m["common.unverified"]()}
				</Badge>
			</div>

			<!-- Tabs -->
			<Tabs.Root bind:value={activeTab} class="w-full">
				<Tabs.List class="w-full">
					<Tabs.Trigger value="profile">
						<UserIcon class="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
						<span class="hidden truncate sm:inline">{m["vendors.personal_info"]()}</span>
						<span class="truncate sm:hidden">{m["vendors.personal_info_short"]()}</span>
					</Tabs.Trigger>
					<Tabs.Trigger
						value="documents"
						class="flex min-w-0 items-center justify-center gap-2 px-2 py-2 text-xs sm:justify-center sm:px-3 sm:py-2 sm:text-sm"
					>
						<FileCheckIcon class="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
						<span class="hidden truncate sm:inline">{m["vendors.documents"]()}</span>
						<span class="truncate sm:hidden">{m["vendors.documents_short"]()}</span>
					</Tabs.Trigger>
					<Tabs.Trigger value="business">
						<FileTextIcon class="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
						<span class="hidden truncate sm:inline">{m["vendors.business_info"]()}</span>
						<span class="truncate sm:hidden">{m["vendors.business_info_short"]()}</span>
					</Tabs.Trigger>
				</Tabs.List>

				<Tabs.Content value="profile" class="mt-4 sm:mt-6">
					<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
						<!-- Colonne 1: Informations personnelles -->
						<div>
							<h3 class="mb-4 text-lg font-semibold">{m["vendors.personal_info"]()}</h3>
							<div class="space-y-4">
								<div>
									<Label class="text-sm font-medium text-gray-500">{m["vendors.name"]()}</Label>
									<p class="text-sm font-medium break-words">
										{[vendorDetails.firstName, vendorDetails.lastName].filter(Boolean).join(" ") ||
											m["common.na"]()}
									</p>
								</div>
								<div>
									<Label class="text-sm font-medium text-gray-500">{m["vendors.email"]()}</Label>
									<p class="text-sm break-all lowercase">
										{vendorDetails.email || m["common.na"]()}
									</p>
								</div>
								<div>
									<Label class="text-sm font-medium text-gray-500">{m["vendors.phone"]()}</Label>
									<p class="text-sm break-words">{vendorDetails.phone || m["common.na"]()}</p>
								</div>
							</div>
						</div>

						<!-- Colonne 2: Vérification -->
						<div>
							<h3 class="mb-4 text-lg font-semibold">{m["vendors.verification"]()}</h3>
							<div class="space-y-3">
								<div class="flex items-center justify-between rounded-lg border p-3">
									<span class="text-sm font-medium">Email</span>
									<Badge
										class={vendorDetails.emailVerified
											? "bg-green-100 text-green-800"
											: "bg-red-100 text-red-800"}
									>
										{vendorDetails.emailVerified
											? m["common.verified"]()
											: m["common.unverified"]()}
									</Badge>
								</div>
								<div class="flex items-center justify-between rounded-lg border p-3">
									<span class="text-sm font-medium">Téléphone</span>
									<Badge
										class={vendorDetails.phoneVerified
											? "bg-green-100 text-green-800"
											: "bg-red-100 text-red-800"}
									>
										{vendorDetails.phoneVerified
											? m["common.verified"]()
											: m["common.unverified"]()}
									</Badge>
								</div>
							</div>
						</div>
					</div>
				</Tabs.Content>

				<Tabs.Content value="business" class="mt-4 sm:mt-6">
					<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
						<!-- Colonne 1: Informations de l'entreprise -->
						<div>
							<h3 class="mb-4 text-lg font-semibold">{m["vendors.business_info"]()}</h3>
							<div class="space-y-4">
								<div>
									<Label class="text-sm font-medium text-gray-500"
										>{m["vendors.business_name"]()}</Label
									>
									<p class="text-sm font-medium break-words">
										{vendorDetails.businessName || m["common.na"]()}
									</p>
								</div>
								<div>
									<Label class="text-sm font-medium text-gray-500">{m["vendors.siret"]()}</Label>
									<p class="font-mono text-sm break-words">
										{vendorDetails.siret || m["common.na"]()}
									</p>
								</div>
								<div>
									<Label class="text-sm font-medium text-gray-500">{m["vendors.address"]()}</Label>
									<p class="text-sm break-words">
										{vendorDetails.address || m["common.na"]()}
									</p>
								</div>
							</div>
						</div>

						<!-- Colonne 2: Informations du compte -->
						<div>
							<h3 class="mb-4 text-lg font-semibold">{m["vendors.account_information"]()}</h3>
							<div class="space-y-4">
								<div>
									<Label class="text-sm font-medium text-gray-500"
										>{m["vendors.created_at"]()}</Label
									>
									<p class="text-sm break-words">
										{vendorDetails.createdAt
											? new Date(vendorDetails.createdAt).toLocaleDateString()
											: m["common.na"]()}
									</p>
								</div>
								<div>
									<Label class="text-sm font-medium text-gray-500"
										>{m["vendors.updated_at"]()}</Label
									>
									<p class="text-sm break-words">
										{vendorDetails.updatedAt
											? new Date(vendorDetails.updatedAt).toLocaleDateString()
											: m["common.na"]()}
									</p>
								</div>
								<div>
									<Label class="text-sm font-medium text-gray-500"
										>{m["vendors.account_status"]()}</Label
									>
									<span
										class="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800"
									>
										{vendorDetails.status ? vendorDetails.status : m["common.unknown"]()}
									</span>
								</div>
							</div>
						</div>

						<!-- Informations de paiement -->
						<div class="mt-6">
							<h3 class="mb-4 text-lg font-semibold">{m["vendors.payment_information"]()}</h3>
							<div class="rounded-lg border p-4">
								<div class="space-y-3">
									<div>
										<Label class="text-sm font-medium text-gray-500"
											>{m["vendors.stripe_status"]()}</Label
										>
										<p class="font-medium">
											{#if vendorDetails.stripeActive}
												<span class="text-green-600">Actif</span>
											{:else}
												<span class="text-red-600">Inactif</span>
											{/if}
										</p>
									</div>
									<div>
										<Label class="text-sm font-medium text-gray-500"
											>{m["vendors.stripe_account_id"]()}</Label
										>
										<p class="font-mono text-sm break-all">
											{vendorDetails.stripeAccountId || m["common.na"]()}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Tabs.Content>

				<Tabs.Content value="documents" class="mt-4 sm:mt-6">
					{#if vendorDetails.documents && vendorDetails.documents.length > 0}
						<div class="space-y-2">
							{#each vendorDetails.documents as document (document.type)}
								<div
									class="flex items-center justify-between border-b border-gray-100 p-3 transition-colors last:border-b-0 hover:bg-gray-50"
								>
									<div class="flex min-w-0 flex-1 items-center gap-3">
										<FileTextIcon class="h-4 w-4 flex-shrink-0 text-gray-400" />
										<span class="truncate text-sm font-medium text-gray-900">
											{getDocumentTypeLabel(document.type!)}
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
							<p>{m["vendors.no_documents_provided"]()}</p>
						</div>
					{/if}
				</Tabs.Content>
			</Tabs.Root>

			<!-- Action Buttons -->
			{#if vendorDetails.status === "pending_approval"}
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
	entityType="vendor"
	entityId={vendor.id ?? null}
/>
