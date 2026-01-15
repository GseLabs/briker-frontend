<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar";
	import type { SidebarItem } from "$lib/config/sidebar";
	import ChevronDown from "@lucide/svelte/icons/chevron-down";
	import { page } from "$app/state";

	let { item }: { item: SidebarItem } = $props();
	let isOpen = $state(true);

	const isActivePath = (href: string | undefined) => {
		return href ? page.url.pathname === href : false;
	};

	const hasActiveChild = $derived(
		item.children?.some((child) => isActivePath(child.href)) || false
	);

	const isActive = $derived(item.href ? isActivePath(item.href) : hasActiveChild);

	// TODO: Maybe re add the effect that closes other menus when one is opened
	// $effect(() => {
	// isOpen = hasActiveChild;
	// });
</script>

<Sidebar.MenuItem>
	{#if item.children}
		<Sidebar.MenuButton onclick={() => (isOpen = !isOpen)} {isActive}>
			<item.icon />
			<span>{item.label()}</span>
			<ChevronDown class="ml-auto transition-transform {isOpen ? 'rotate-180' : ''}" />
		</Sidebar.MenuButton>

		{#if isOpen}
			<Sidebar.MenuSub>
				{#each item.children as bruh}
					<Sidebar.MenuSubItem>
						<Sidebar.MenuSubButton isActive={isActivePath(bruh.href)}>
							{#snippet child({ props })}
								<a href={bruh.href} {...props}>
									<bruh.icon />
									<span>{bruh.label()}</span>
								</a>
							{/snippet}
						</Sidebar.MenuSubButton>
					</Sidebar.MenuSubItem>
				{/each}
			</Sidebar.MenuSub>
		{/if}
	{:else}
		<Sidebar.MenuButton isActive={isActivePath(item.href)}>
			{#snippet child({ props })}
				<a href={item.href} {...props}>
					<item.icon />
					<span>{item.label()}</span>
				</a>
			{/snippet}
		</Sidebar.MenuButton>
	{/if}
</Sidebar.MenuItem>
