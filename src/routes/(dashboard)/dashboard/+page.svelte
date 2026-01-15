<script lang="ts">
	import AdminDashboard from "./admin-dashboard.svelte";
	import VendorDashboard from "./vendor-dashboard.svelte";
	import * as m from "$lib/paraglide/messages";

	let { data } = $props();
</script>

<svelte:head>
	<title>{m["dashboard.title"]()}</title>
	<meta name="description" content={m["dashboard.description"]()} />
</svelte:head>

{#if data.user.role === "admin"}
	<AdminDashboard {data} />
{:else if data.user.role === "vendor"}
	<VendorDashboard {data} />
{/if}
