<script lang="ts">
	interface Props {
		status: string;
		colorClass: string;
	}

	let { status, colorClass }: Props = $props();
</script>

<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {colorClass}">
	{status}
</span>
