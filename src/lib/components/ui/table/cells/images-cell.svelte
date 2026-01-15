<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import ImageIcon from "@lucide/svelte/icons/image";

	interface Props {
		imageCount: number;
		onClick: () => void;
	}

	let { imageCount, onClick }: Props = $props();
</script>

<Button variant="ghost" size="sm" onclick={onClick}>
	<div class="flex items-center gap-1">
		<ImageIcon class="h-4 w-4" />
		<span>{imageCount}</span>
	</div>
</Button>
