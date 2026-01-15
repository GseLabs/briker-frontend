<script lang="ts">
	import Navbar from "$lib/components/navbar.svelte";
	import Footer from "$lib/components/landing/footer.svelte";

	let { children } = $props();
</script>

<Navbar />
<main class="py-2">
	{@render children?.()}
</main>
<Footer />
