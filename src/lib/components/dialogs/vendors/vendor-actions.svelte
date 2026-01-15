<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import EllipsisVertical from "@lucide/svelte/icons/ellipsis";
	import Eye from "@lucide/svelte/icons/eye";
	import Edit from "@lucide/svelte/icons/edit";
	import Trash2 from "@lucide/svelte/icons/trash-2";
	import * as m from "$lib/paraglide/messages";
	import type { AdminAdminVendorResponse } from "$lib/api/client";
	import VendorApprovalDialog from "./vendor-approval-dialog.svelte";
	import VendorEditDialog from "./vendor-edit-dialog.svelte";
	import VendorBanDialog from "./vendor-ban-dialog.svelte";

	interface Props {
		vendor: AdminAdminVendorResponse;
	}

	let { vendor }: Props = $props();

	let showApprovalDialog = $state(false);
	let showEditDialog = $state(false);
	let showBanDialog = $state(false);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button variant="ghost" size="icon" class="h-8 w-8">
			<span class="sr-only">Open menu</span>
			<EllipsisVertical class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end" class="w-40">
		<DropdownMenu.Item onclick={() => (showApprovalDialog = true)}>
			<Eye class="mr-2 h-4 w-4" />
			{m["common.view"]()}
		</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => (showEditDialog = true)}>
			<Edit class="mr-2 h-4 w-4" />
			{m["common.edit"]()}
		</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item onclick={() => (showBanDialog = true)} class="text-red-600">
			<Trash2 class="mr-2 h-4 w-4" />
			{m["vendors.ban_vendor"]()}
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<!-- Dialogs -->
<VendorApprovalDialog
	{vendor}
	open={showApprovalDialog}
	onOpenChange={(open) => (showApprovalDialog = open)}
/>
<VendorEditDialog {vendor} open={showEditDialog} onOpenChange={(open) => (showEditDialog = open)} />
<VendorBanDialog {vendor} open={showBanDialog} onOpenChange={(open) => (showBanDialog = open)} />
