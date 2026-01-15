<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import Menu from "@lucide/svelte/icons/menu";
	import X from "@lucide/svelte/icons/x";
	import { onMount } from "svelte";
	import { page } from "$app/state";
	import { slide } from "svelte/transition";
	import LanguageSelector from "$lib/components/selector/language-selector.svelte";
	import { m } from "$lib/paraglide/messages.js";

	interface NavItem {
		label: string;
		href: string;
	}

	let isMobileMenuOpen: boolean = $state(false);
	let isJoinUsDropdownOpen: boolean = $state(false);
	let mounted: boolean = $state(false);

	const navItems: NavItem[] = [
		{ label: m["nav.home"](), href: "/" },
		{ label: m["nav.about"](), href: "/about" },
		{ label: m["nav.privacy"](), href: "/privacy" },
		{ label: m["nav.terms"](), href: "/terms" },
		{ label: m["nav.contact"](), href: "/contact" }
	];

	onMount(() => {
		mounted = true;
	});

	function toggleMobileMenu(): void {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	function handleNavClick(): void {
		isMobileMenuOpen = false;
	}

	function toggleJoinUsDropdown(): void {
		isJoinUsDropdownOpen = !isJoinUsDropdownOpen;
	}
</script>

<nav
	class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container mx-auto px-4">
		<div class="flex h-16 items-center justify-between">
			<div class="flex items-center">
				<a href="/" class="flex items-center space-x-2">
					<img src="/img/logo_long.webp" alt="Briker Logo" class="h-8 w-auto" />
				</a>
			</div>

			<div class="hidden items-center space-x-8 md:flex">
				{#each navItems as item (item.href)}
					<a
						href={item.href}
						class="group relative text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
						class:text-primary={page.url.pathname === item.href}
					>
						{item.label}
						<span
							class="absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 {page
								.url.pathname === item.href
								? 'w-full'
								: 'w-0 group-hover:w-full'}"
						></span>
					</a>
				{/each}
			</div>

			<div class="hidden items-center space-x-4 md:flex">
				<div class="flex items-center space-x-4">
					<LanguageSelector />
					<a href="/login">
						<Button variant="outline">
							{m["nav.login"]()}
						</Button>
					</a>
					<div class="group relative">
						<Button class="bg-primary text-primary-foreground hover:bg-primary"
							>{m["nav.join_us"]()}</Button
						>
						<div
							class="invisible absolute right-0 z-50 mt-2 w-56 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100"
						>
							<div class="rounded-md border bg-background py-2 shadow-lg">
								<a
									href="/vendor-registration"
									class="group/item relative block px-4 py-2 text-sm text-foreground/80 transition-colors hover:text-primary"
								>
									<span
										class="absolute top-0 bottom-0 left-0 w-0 bg-primary transition-all duration-200 group-hover/item:w-1"
									></span>
									<span class="ml-2">{m["nav.store_registration"]()}</span>
								</a>
								<a
									href="/courier-registration"
									class="group/item relative block px-4 py-2 text-sm text-foreground/80 transition-colors hover:text-primary"
								>
									<span
										class="absolute top-0 bottom-0 left-0 w-0 bg-primary transition-all duration-200 group-hover/item:w-1"
									></span>
									<span class="ml-2">{m["nav.deliveryman_registration"]()}</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="flex md:hidden">
				<Button variant="ghost" size="icon" onclick={toggleMobileMenu} aria-label="Toggle menu">
					{#if isMobileMenuOpen}
						<X class="h-5 w-5" />
					{:else}
						<Menu class="h-5 w-5" />
					{/if}
				</Button>
			</div>
		</div>

		{#if mounted && isMobileMenuOpen}
			<div
				class="overflow-hidden border-t bg-background md:hidden"
				in:slide={{ duration: 300 }}
				out:slide={{ duration: 250 }}
			>
				<div class="space-y-1 px-4 py-4">
					{#each navItems as item (item.href)}
						<a
							href={item.href}
							onclick={handleNavClick}
							class="block py-3 text-base font-medium text-foreground/80 transition-colors hover:text-foreground"
							class:text-primary={page.url.pathname === item.href}
						>
							{item.label}
						</a>
					{/each}

					<div class="space-y-3 border-t pt-4">
						<div class="mb-3">
							<LanguageSelector />
						</div>
						<a href="/login">
							<Button variant="outline" class="mb-3 w-full">
								{m["nav.login"]()}
							</Button>
						</a>
						<div>
							<Button
								class="w-full bg-primary text-primary-foreground hover:bg-primary"
								onclick={toggleJoinUsDropdown}
							>
								{m["nav.join_us"]()}
							</Button>
							{#if isJoinUsDropdownOpen}
								<div class="mt-2">
									<div class="rounded-md border bg-background py-2 shadow-lg">
										<a
											href="/vendor-registration"
											class="group/item relative block px-4 py-2 text-sm text-foreground/80 transition-colors hover:text-primary"
										>
											<span
												class="absolute top-0 bottom-0 left-0 w-0 bg-primary transition-all duration-200 group-hover/item:w-1"
											></span>
											<span class="ml-2">{m["nav.store_registration"]()}</span>
										</a>
										<a
											href="/courier-registration"
											class="group/item relative block px-4 py-2 text-sm text-foreground/80 transition-colors hover:text-primary"
										>
											<span
												class="absolute top-0 bottom-0 left-0 w-0 bg-primary transition-all duration-200 group-hover/item:w-1"
											></span>
											<span class="ml-2">{m["nav.deliveryman_registration"]()}</span>
										</a>
									</div>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</nav>
