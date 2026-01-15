<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Avatar, AvatarFallback } from "$lib/components/ui/avatar";
	import { sidebarConfig } from "$lib/config/sidebar";
	import LanguageSelector from "$lib/components/selector/language-selector.svelte";
	import SidebarItem from "./sidebar-item.svelte";
	import LogOut from "@lucide/svelte/icons/log-out";
	import Settings from "@lucide/svelte/icons/settings";
	import ChevronsUpDown from "@lucide/svelte/icons/chevrons-up-down";
	import { logout } from "$lib/api/stores";
	import { goto } from "$app/navigation";
	import type { ComponentProps } from "svelte";
	import type { RoutesMeResponse } from "$lib/api/client/models/RoutesMeResponse";
	import { m } from "$lib/paraglide/messages";

	let {
		data,
		...restProps
	}: { data: { user: RoutesMeResponse } } & ComponentProps<typeof Sidebar.Root> = $props();

	const menuItems = $derived(sidebarConfig[data.user.role!.toString()] || []);
	const user = data.user;

	const handleLogout = async () => {
		await logout();
		goto("/login");
	};

	const userInitials = $derived(() => {
		if (user.firstName) {
			return user.firstName
				.split(" ")
				.map((n: string) => n[0])
				.join("")
				.toUpperCase();
		}
		return user.role!.slice(0, 2).toUpperCase();
	});
</script>

<Sidebar.Root collapsible="offcanvas" {...restProps}>
	<Sidebar.Header>
		<div class="flex h-12 items-center px-4">
			<img src="/img/logo_long.webp" alt="Briker Logo" class="h-8 w-auto" />
		</div>
	</Sidebar.Header>

	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
			<Sidebar.Menu>
				{#each menuItems as item}
					<SidebarItem {item} />
				{/each}
			</Sidebar.Menu>
		</Sidebar.Group>
	</Sidebar.Content>

	<Sidebar.Footer>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Sidebar.MenuButton
								{...props}
								size="lg"
								class="data-[slot=sidebar-menu-button]:w-full data-[slot=sidebar-menu-button]:justify-start"
							>
								<Avatar class="h-8 w-8 rounded-lg">
									<AvatarFallback class="rounded-lg">{userInitials()}</AvatarFallback>
								</Avatar>
								<div class="grid flex-1 text-left text-sm leading-tight">
									<span class="truncate font-semibold">{user.firstName || user.role}</span>
									<span class="truncate text-xs">{user.email}</span>
								</div>
								<ChevronsUpDown class="ml-auto size-4" />
							</Sidebar.MenuButton>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content
						class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side="bottom"
						align="end"
						sideOffset={4}
					>
						<DropdownMenu.Label class="p-0 font-normal">
							<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar class="h-8 w-8 rounded-lg">
									<AvatarFallback class="rounded-lg">{userInitials()}</AvatarFallback>
								</Avatar>
								<div class="grid flex-1 text-left text-sm leading-tight">
									<span class="truncate font-semibold">{user.firstName || user.role}</span>
									<span class="truncate text-xs">{user.email}</span>
								</div>
							</div>
						</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Group>
							<DropdownMenu.Item>
								<Settings />
								{m["sidebar.settings"]()}
							</DropdownMenu.Item>
						</DropdownMenu.Group>
						<DropdownMenu.Separator />
						<LanguageSelector class="w-full" showLabel />
						<DropdownMenu.Separator />
						<DropdownMenu.Item onclick={handleLogout}>
							<LogOut />
							{m["sidebar.logout"]()}
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
</Sidebar.Root>
