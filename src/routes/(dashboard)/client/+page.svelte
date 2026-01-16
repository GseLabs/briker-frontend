<script lang="ts">
	import { createQuery } from "@tanstack/svelte-query";
	import { env } from "$env/dynamic/public";
	import * as m from "$lib/paraglide/messages";
	import { showErrorToast } from "$lib/utils/toast";
	import { page } from "$app/stores";
	import { ShoppingBag, Package, MapPin } from "@lucide/svelte/icons";
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";

	type Order = {
		id: string;
		status: string;
		total_amount: number;
		created_at: string;
		vendor_name: string | null;
	};

	const ordersQuery = createQuery(() => ({
		queryKey: ["client", "orders"],
		queryFn: async () => {
			const response = await fetch(`${env.PUBLIC_API_BASE_PATH}/client/orders`, {
				headers: {
					"Content-Type": "application/json"
				},
				credentials: "include"
			});
			if (!response.ok) {
				throw new Error("Failed to fetch orders");
			}
			const data = await response.json();
			return data.orders || [];
		},
		staleTime: 1000 * 60 * 2
	}));

	const orders = $derived(ordersQuery.data || []);
	const loading = $derived(ordersQuery.isLoading);

	$effect(() => {
		showErrorToast(ordersQuery, m["common.error_loading"]());
	});

	function getStatusColor(status: string): string {
		switch (status) {
			case "pending":
				return "bg-yellow-100 text-yellow-800";
			case "confirmed":
				return "bg-blue-100 text-blue-800";
			case "processing":
				return "bg-purple-100 text-purple-800";
			case "picked_up":
				return "bg-indigo-100 text-indigo-800";
			case "delivered":
				return "bg-green-100 text-green-800";
			case "canceled":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	}

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString("fr-FR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		});
	}
</script>

<div class="p-6">
	<div class="flex justify-between items-center mb-6">
		<h1 class="text-2xl font-bold">{m["client.my_orders"]()}</h1>
		<Button href="/dashboard/client/cart" variant="outline">
			<ShoppingBag class="h-4 w-4 mr-2" />
			{m["cart.view_cart"]()}
		</Button>
	</div>

	{#if loading}
		<div class="flex justify-center items-center h-64">
			<div class="text-gray-500">{m["common.loading"]()}</div>
		</div>
	{:else if orders.length === 0}
		<Card.Root>
			<Card.Content class="flex flex-col items-center justify-center py-12">
				<Package class="h-16 w-16 text-gray-400 mb-4" />
				<h2 class="text-lg font-semibold text-gray-900 mb-2">{m["orders.no_orders"]()}</h2>
				<p class="text-gray-500 text-center mb-4">{m["orders.no_orders_desc"]()}</p>
				<Button href="/">{m["common.browse_vendors"]()}</Button>
			</Card.Content>
		</Card.Root>
	{:else}
		<div class="grid gap-4">
			{#each orders as order}
				<Card.Root>
					<Card.Content>
						<div class="flex justify-between items-start">
							<div>
								<div class="flex items-center gap-2 mb-2">
									<span class="text-sm text-gray-500">#{order.id.slice(0, 8)}</span>
									<span class="px-2 py-1 rounded-full text-xs font-medium {getStatusColor(order.status)}">
										{order.status}
									</span>
								</div>
								<h3 class="font-semibold text-lg">{order.vendor_name || "Unknown Vendor"}</h3>
								<p class="text-sm text-gray-500">{formatDate(order.created_at)}</p>
							</div>
							<div class="text-right">
								<p class="text-lg font-bold">{(order.total_amount / 100).toFixed(2)}€</p>
							</div>
						</div>
						<div class="flex gap-2 mt-4 pt-4 border-t">
							<Button href={`/dashboard/client/orders/${order.id}`} variant="outline" class="flex-1">
								{m["common.view_details"]()}
							</Button>
							<Button href={`/dashboard/client/orders/${order.id}/track`} variant="default" class="flex-1">
								<MapPin class="h-4 w-4 mr-2" />
								{m["orders.track_order"]()}
							</Button>
						</div>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	{/if}
</div>
