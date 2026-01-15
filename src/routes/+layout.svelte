<script lang="ts">
	import "../app.css";

	import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
	import { Toaster } from "$lib/components/ui/sonner";
	import { page } from "$app/state";
	import { goto } from "$app/navigation";
	import { showErrorToastByKey, showSuccessToastByKey } from "$lib/utils/toast";

	let { children } = $props();

	const queryClient = new QueryClient();

	$effect(() => {
		const success = page.url.searchParams.get("success");
		const error = page.url.searchParams.get("error");

		if (success || error) {
			if (success) showSuccessToastByKey(success);
			if (error) showErrorToastByKey(error);

			const newUrl = new URL(page.url);
			newUrl.searchParams.delete("success");
			newUrl.searchParams.delete("error");
			goto(newUrl, { replaceState: true });
		}
	});
</script>

<QueryClientProvider client={queryClient}>
	<main class="min-h-screen scroll-smooth">
		{@render children?.()}
	</main>
	<Toaster />
</QueryClientProvider>
