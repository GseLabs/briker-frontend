<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import Package from "@lucide/svelte/icons/package";
	import ShoppingCart from "@lucide/svelte/icons/shopping-cart";
	import Users from "@lucide/svelte/icons/users";
	import TrendingUp from "@lucide/svelte/icons/trending-up";
	import { createQuery } from "@tanstack/svelte-query";
	import { AdminApi } from "$lib/api/client";
	import { apiConfig } from "$lib/api/config";
	import UsersDistributionChart from "$lib/components/charts/users-distribution-chart.svelte";
	import * as m from "$lib/paraglide/messages";

	let { data } = $props();

	const adminApi = new AdminApi(apiConfig);

	const usersStatsQuery = createQuery(() => ({
		queryKey: ["users-stats"],
		queryFn: async () => {
			const response = await adminApi.adminUsersGet({
				limit: 1000,
				page: 1
			});
			return {
				total: response.users?.length || 0,
				users: response.users || []
			};
		},
		staleTime: 1000 * 60 * 5
	}));

	const totalUsers = $derived(usersStatsQuery.data?.total || 0);
</script>

<div class="space-y-8 p-8">
	<div>
		<h1 class="text-3xl font-bold">{m["dashboard.title"]()}</h1>
		<p class="text-muted-foreground">{m["dashboard.welcome_back"]({ email: data.user.email })}</p>
	</div>

	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Total Products</Card.Title>
				<Package class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">1,234</div>
				<p class="text-xs text-muted-foreground">+20% from last month</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Total Orders</Card.Title>
				<ShoppingCart class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">567</div>
				<p class="text-xs text-muted-foreground">+12% from last month</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">{m["users.total_users"]()}</Card.Title>
				<Users class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">
					{#if usersStatsQuery.isLoading}
						<div class="h-8 w-16 animate-pulse rounded bg-gray-200"></div>
					{:else}
						{totalUsers.toLocaleString()}
					{/if}
				</div>
				<p class="text-xs text-muted-foreground">{m["users.total_registered_users"]()}</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Revenue</Card.Title>
				<TrendingUp class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">€45,231</div>
				<p class="text-xs text-muted-foreground">+18% from last month</p>
			</Card.Content>
		</Card.Root>
	</div>

	<div class="grid gap-4 md:grid-cols-2">
		<UsersDistributionChart />

		<Card.Root>
			<Card.Header>
				<Card.Title>Recent Activity</Card.Title>
				<Card.Description>Overview of recent platform activity</Card.Description>
			</Card.Header>
			<Card.Content>
				<p class="text-muted-foreground">Dashboard content coming soon...</p>
			</Card.Content>
		</Card.Root>
	</div>
</div>
