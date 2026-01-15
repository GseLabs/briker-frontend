<script lang="ts">
	interface Props {
		id: string;
	}

	let { id }: Props = $props();

	const shortId = id.length > 8 ? `${id.slice(0, 4)}...${id.slice(-4)}` : id;
</script>

<div class="font-mono" title={id}>
	{shortId}
</div>
