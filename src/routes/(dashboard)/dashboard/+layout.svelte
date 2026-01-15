<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar";
	import AppSidebar from "$lib/components/sidebar/app-sidebar.svelte";

	let { data, children } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar {data} />
	<main class="flex-1 overflow-x-auto p-6">
		{@render children()}
	</main>
</Sidebar.Provider>
