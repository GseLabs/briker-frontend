<script lang="ts">
	import { createQuery } from "@tanstack/svelte-query";
	import { env } from "$env/dynamic/public";
	import * as m from "$lib/paraglide/messages";
	import { showErrorToast } from "$lib/utils/toast";
	import { page } from "$app/stores";
	import { ArrowLeft, Calendar, MapPin, Package, User } from "@lucide/svelte/icons";
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { Badge } from "$lib/components/ui/badge";
	import { Separator } from "$lib/components/ui/separator";

	type OrderItem = {
		id: string;
		product_name: string;
		product_image: string | null;
		quantity: number;
		price: number;
	};

	type Order = {
		id: string;
		status: string;
		payment_status: string;
		payment_method: string;
		order_type: string;
		subtotal_amount: number;
		delivery_fee: number;
		total_amount: number;
		contact_name: string | null;
		contact_phone: string | null;
		note: string | null;
		delivery_address: {
			address: string;
			city: string;
			postal_code: string;
		} | null;
		created_at: string;
		items: OrderItem[];
		vendor: {
			name: string;
			phone: string | null;
		};
	};

	const orderId = $page.params.id;

	const orderQuery = createQuery(() => ({
		queryKey: ["client", "orders", orderId],
		queryFn: async () => {
			const response = await fetch(`${env.PUBLIC_API_BASE_PATH}/client/orders/${orderId}`, {
				headers: {
					"Content-Type": "application/json"
				},
				credentials: "include"
			});
			if (!response.ok) {
				throw new Error("Failed to fetch order");
			}
			return await response.json();
		},
		staleTime: 1000 * 60 * 2
	}));

	const order = $derived(orderQuery.data);
	const loading = $derived(orderQuery.isLoading);

	$effect(() => {
		showErrorToast(orderQuery, m["common.error_loading"]());
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

	function getPaymentStatusColor(status: string): string {
		switch (status) {
			case "paid":
				return "bg-green-100 text-green-800";
			case "pending":
				return "bg-yellow-100 text-yellow-800";
			case "failed":
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
	<Button href="/dashboard/client" variant="ghost" class="mb-6">
		<ArrowLeft class="h-4 w-4 mr-2" />
		{m["common.back"]()}
	</Button>

	{#if loading}
		<div class="flex justify-center items-center h-64">
			<div class="text-gray-500">{m["common.loading"]()}</div>
		</div>
	{:else if order}
		<div class="max-w-4xl mx-auto space-y-6">
			<div class="flex justify-between items-start">
				<div>
					<h1 class="text-2xl font-bold mb-2">{m["orders.order"]} #{order.id.slice(0, 8)}</h1>
					<div class="flex items-center gap-2">
						<span class="px-3 py-1 rounded-full text-sm font-medium {getStatusColor(order.status)}">
							{order.status}
						</span>
						<span class="px-3 py-1 rounded-full text-sm font-medium {getPaymentStatusColor(order.payment_status)}">
							{order.payment_status}
						</span>
					</div>
				</div>
				<div class="text-right">
					<p class="text-3xl font-bold">{(order.total_amount / 100).toFixed(2)}€</p>
				</div>
			</div>

			<div class="grid md:grid-cols-2 gap-6">
				<Card.Root>
					<Card.Header>
						<Card.Title class="flex items-center gap-2">
							<Package class="h-5 w-5" />
							{m["orders.order_details"]()}
						</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-4">
						<div>
							<p class="text-sm text-gray-500 mb-1">{m["common.vendor"]()}</p>
							<p class="font-semibold">{order.vendor.name}</p>
						</div>
						<div>
							<p class="text-sm text-gray-500 mb-1">{m["common.date"]()}</p>
							<p class="font-semibold">{formatDate(order.created_at)}</p>
						</div>
						{#if order.delivery_address}
							<div>
								<p class="text-sm text-gray-500 mb-1">{m["orders.delivery_address"]()}</p>
								<p class="font-semibold">{order.delivery_address.address}</p>
								<p class="text-gray-600">{order.delivery_address.postal_code} {order.delivery_address.city}</p>
							</div>
						{/if}
						{#if order.contact_name}
							<div>
								<p class="text-sm text-gray-500 mb-1">{m["orders.contact"]()}</p>
								<p class="font-semibold">{order.contact_name}</p>
								<p class="text-gray-600">{order.contact_phone}</p>
							</div>
						{/if}
						{#if order.note}
							<div>
								<p class="text-sm text-gray-500 mb-1">{m["orders.note"]()}</p>
								<p class="text-gray-600">{order.note}</p>
							</div>
						{/if}
					</Card.Content>
				</Card.Root>

				<Card.Root>
					<Card.Header>
						<Card.Title>{m["cart.order_summary"]()}</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-4">
						{#each order.items as item}
							<div class="flex gap-4">
								<div class="h-16 w-16 bg-gray-100 rounded-lg flex-shrink-0">
									{#if item.product_image}
										<img src={item.product_image} alt={item.product_name} class="h-full w-full object-cover rounded-lg" />
									{:else}
										<div class="h-full w-full flex items-center justify-center text-gray-400">
											<Package class="h-8 w-8" />
										</div>
									{/if}
								</div>
								<div class="flex-1">
									<p class="font-semibold">{item.product_name}</p>
									<p class="text-sm text-gray-600">x{item.quantity}</p>
								</div>
								<div class="text-right">
									<p class="font-semibold">{((item.price * item.quantity) / 100).toFixed(2)}€</p>
								</div>
							</div>
							<Separator />
						{/each}
						<div class="flex justify-between pt-2">
							<span class="text-gray-600">{m["cart.subtotal"]()}</span>
							<span>{(order.subtotal_amount / 100).toFixed(2)}€</span>
						</div>
						<div class="flex justify-between">
							<span class="text-gray-600">{m["cart.delivery_fee"]()}</span>
							<span>{(order.delivery_fee / 100).toFixed(2)}€</span>
						</div>
						<div class="flex justify-between text-lg font-bold pt-2 border-t">
							<span>{m["cart.total"]()}</span>
							<span>{(order.total_amount / 100).toFixed(2)}€</span>
						</div>
					</Card.Content>
				</Card.Root>
			</div>

			<Button href={`/dashboard/client/orders/${order.id}/track`} class="w-full">
				<MapPin class="h-4 w-4 mr-2" />
				{m["orders.track_order"]()}
			</Button>
		</div>
	{/if}
</div>
