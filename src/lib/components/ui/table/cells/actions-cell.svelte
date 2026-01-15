<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import Edit from "@lucide/svelte/icons/edit";
	import Trash2 from "@lucide/svelte/icons/trash-2";
	import { toast } from "svelte-sonner";

	interface Props {
		onEdit: () => void;
		onDelete: () => void;
	}

	let { onEdit, onDelete }: Props = $props();
</script>

<div class="flex items-center gap-2">
	<Button variant="ghost" size="sm" onclick={onEdit}>
		<Edit class="h-4 w-4" />
	</Button>
	<Button variant="ghost" size="sm" onclick={onDelete}>
		<Trash2 class="h-4 w-4" />
	</Button>
</div>
