<script lang="ts">
	import * as m from "$lib/paraglide/messages";

	let { date, showTime = false } = $props<{
		date?: string;
		showTime?: boolean;
	}>();
</script>

{#if date}
	<div class="text-sm">
		{showTime
			? new Date(date).toLocaleDateString("fr-FR", {
					day: "2-digit",
					month: "2-digit",
					year: "numeric",
					hour: "2-digit",
					minute: "2-digit"
				})
			: new Date(date).toLocaleDateString("fr-FR", {
					day: "2-digit",
					month: "2-digit",
					year: "numeric"
				})}
	</div>
{:else}
	<div class="text-muted-foreground">{m["common.na"]()}</div>
{/if}
