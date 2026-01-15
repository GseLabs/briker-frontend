<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import { Button } from "$lib/components/ui/button";
	import { getDocumentTypeLabel } from "$lib/utils/document-translations";
	import DownloadIcon from "@lucide/svelte/icons/download";
	import type { AdminVendorDocument, AdminCourierDocument } from "$lib/api/client";
	import * as m from "$lib/paraglide/messages";
	import { env } from "$env/dynamic/public";

	type DocumentType = AdminVendorDocument | AdminCourierDocument;

	interface Props {
		open: boolean;
		onOpenChange: (open: boolean) => void;
		document: DocumentType | null;
		onDownload: (document: DocumentType) => void;
		entityType: "vendor" | "courier";
		entityId: string | null;
	}

	let {
		open = $bindable(),
		onOpenChange,
		document,
		onDownload,
		entityType,
		entityId
	}: Props = $props();

	async function handleDownload() {
		if (!document) return;
		onDownload(document);
	}

	function getIframeSrc(): string {
		if (!document || !entityId) return "";
		return `${env.PUBLIC_API_BASE_PATH}/admin/${entityType}s/${entityId}/documents/${document.type}`;
	}
</script>

<Dialog.Root bind:open {onOpenChange}>
	<Dialog.Content class="mx-auto flex max-h-[90vh] w-full flex-col md:!max-w-5xl">
		<Dialog.Header>
			<Dialog.Title>{m["common.view_document"]()}</Dialog.Title>
			<Dialog.Description>
				{getDocumentTypeLabel(document?.type || "")}
			</Dialog.Description>
		</Dialog.Header>

		<div class="flex-1 overflow-auto rounded-lg bg-gray-50 p-4">
			{#if document && entityId}
				<iframe
					src={getIframeSrc()}
					class="h-full min-h-[600px] w-full rounded border-0"
					title={getDocumentTypeLabel(document?.type || "")}
				></iframe>
			{:else}
				<div class="flex h-full items-center justify-center">
					<p>{m["common.loading_document"]()}</p>
				</div>
			{/if}
		</div>

		<div class="flex justify-end space-x-2 border-t pt-4">
			<Button variant="outline" onclick={handleDownload} disabled={!document}>
				<DownloadIcon class="mr-2 h-4 w-4" />
				{m["common.download"]()}
			</Button>
			<Button variant="default" onclick={() => onOpenChange(false)}>
				{m["common.close"]()}
			</Button>
		</div>
	</Dialog.Content>
</Dialog.Root>
