<script lang="ts">
	interface Props {
		text: string;
		class?: string;
	}

	let { text, class: className = "" }: Props = $props();
</script>

<div class={className}>{text}</div>
