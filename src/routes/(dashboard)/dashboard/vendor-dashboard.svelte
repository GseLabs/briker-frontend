<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import Package from "@lucide/svelte/icons/package";
	import ShoppingCart from "@lucide/svelte/icons/shopping-cart";
	import TrendingUp from "@lucide/svelte/icons/trending-up";
	import AlertCircle from "@lucide/svelte/icons/alert-circle";

	let { data } = $props();
</script>

<div class="space-y-8 p-8">
	<div>
		<h1 class="text-3xl font-bold">Vendor Dashboard</h1>
		<p class="text-muted-foreground">Welcome back, {data.user.email}</p>
	</div>

	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">My Products</Card.Title>
				<Package class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">87</div>
				<p class="text-xs text-muted-foreground">Active listings</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Active Orders</Card.Title>
				<ShoppingCart class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">23</div>
				<p class="text-xs text-muted-foreground">Awaiting processing</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Revenue</Card.Title>
				<TrendingUp class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">€12,450</div>
				<p class="text-xs text-muted-foreground">This month</p>
			</Card.Content>
		</Card.Root>
	</div>

	<Card.Root>
		<Card.Header>
			<Card.Title>Recent Orders</Card.Title>
			<Card.Description>Orders that need your attention</Card.Description>
		</Card.Header>
		<Card.Content>
			<p class="text-muted-foreground">Order list coming soon...</p>
		</Card.Content>
	</Card.Root>
</div>
