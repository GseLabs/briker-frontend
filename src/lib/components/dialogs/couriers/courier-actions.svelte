<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import EllipsisVertical from "@lucide/svelte/icons/ellipsis";
	import Eye from "@lucide/svelte/icons/eye";
	import Edit from "@lucide/svelte/icons/edit";
	import Trash2 from "@lucide/svelte/icons/trash-2";
	import * as m from "$lib/paraglide/messages";
	import type { AdminAdminCourierResponse } from "$lib/api/client";
	import CourierApprovalDialog from "./courier-approval-dialog.svelte";
	import CourierEditDialog from "./courier-edit-dialog.svelte";
	import CourierBanDialog from "./courier-ban-dialog.svelte";

	interface Props {
		courier: AdminAdminCourierResponse;
	}

	let { courier }: Props = $props();

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
			{m["couriers.ban_courier"]()}
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<!-- Dialogs -->
<CourierApprovalDialog
	{courier}
	open={showApprovalDialog}
	onOpenChange={(open) => (showApprovalDialog = open)}
/>
<CourierEditDialog
	{courier}
	open={showEditDialog}
	onOpenChange={(open) => (showEditDialog = open)}
/>
<CourierBanDialog {courier} open={showBanDialog} onOpenChange={(open) => (showBanDialog = open)} />
