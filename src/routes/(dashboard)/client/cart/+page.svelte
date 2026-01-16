<script lang="ts">
	import { createQuery } from "@tanstack/svelte-query";
	import { env } from "$env/dynamic/public";
	import * as m from "$lib/paraglide/messages";
	import { showErrorToast } from "$lib/utils/toast";
	import { ShoppingBag, Trash2, Plus, Minus } from "@lucide/svelte/icons";
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { Badge } from "$lib/components/ui/badge";

	type CartItem = {
		id: string;
		product: {
			id: string;
			name: string;
			product_images: string[];
			price: number;
		};
		quantity: number;
		unit_price: number;
		total_price: number;
	};

	type Cart = {
		id: string;
		vendor_id: string;
		status: string;
		currency: string;
		items: CartItem[];
		subtotal: number;
		total: number;
	};

	const cartQuery = createQuery(() => ({
		queryKey: ["client", "cart"],
		queryFn: async () => {
			const response = await fetch(`${env.PUBLIC_API_BASE_PATH}/client/cart`, {
				headers: {
					"Content-Type": "application/json"
				},
				credentials: "include"
			});
			if (!response.ok) {
				throw new Error("Failed to fetch cart");
			}
			return await response.json();
		},
		staleTime: 1000 * 30
	}));

	const cart = $derived(cartQuery.data);
	const loading = $derived(cartQuery.isLoading);

	$effect(() => {
		showErrorToast(cartQuery, m["common.error_loading"]());
	});

	async function updateQuantity(itemId: string, delta: number) {
		const newQuantity = cart.items.find((item) => item.id === itemId)?.quantity + delta;
		if (newQuantity < 1) return;

		const response = await fetch(`${env.PUBLIC_API_BASE_PATH}/client/cart/items/${itemId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			credentials: "include",
			body: JSON.stringify({ quantity: newQuantity })
		});

		if (response.ok) {
			cartQuery.refetch();
		}
	}

	async function removeItem(itemId: string) {
		const response = await fetch(`${env.API_BASE_PATH}/client/cart/items/${itemId}`, {
			method: "DELETE",
			credentials: "include"
		});

		if (response.ok) {
			cartQuery.refetch();
		}
	}

	async function clearCart() {
		const response = await fetch(`${env.PUBLIC_API_BASE_PATH}/client/cart`, {
			method: "DELETE",
			credentials: "include"
		});

		if (response.ok) {
			cartQuery.refetch();
		}
	}

	async function checkout() {
		window.location.href = "/dashboard/client/checkout";
	}
</script>

<div class="p-6">
	<h1 class="text-2xl font-bold mb-6 flex items-center gap-2">
		<ShoppingBag class="h-6 w-6" />
		{m["cart.shopping_cart"]()}
	</h1>

	{#if loading}
		<div class="flex justify-center items-center h-64">
			<div class="text-gray-500">{m["common.loading"]()}</div>
		</div>
	{:else if !cart || cart.items.length === 0}
		<Card.Root>
			<Card.Content class="flex flex-col items-center justify-center py-12">
				<ShoppingBag class="h-16 w-16 text-gray-400 mb-4" />
				<h2 class="text-lg font-semibold text-gray-900 mb-2">{m["cart.empty_cart"]()}</h2>
				<p class="text-gray-500 text-center mb-4">{m["cart.empty_cart_desc"]()}</p>
				<Button href="/">{m["common.browse_vendors"]()}</Button>
			</Card.Content>
		</Card.Root>
	{:else}
		<div class="grid lg:grid-cols-3 gap-6">
			<div class="lg:col-span-2 space-y-4">
				<Card.Root>
					<Card.Header>
						<Card.Title>{cart.vendor.name}</Card.Title>
					</Card.Header>
					<Card.Content>
						<div class="space-y-4">
							{#each cart.items as item}
								<div class="flex gap-4 p-4 border rounded-lg">
									<div class="h-20 w-20 bg-gray-100 rounded-lg flex-shrink-0">
										{#if item.product_image}
											<img src={item.product_image} alt={item.product_name} class="h-full w-full object-cover rounded-lg" />
										{:else}
											<div class="h-full w-full flex items-center justify-center text-gray-400">
												<ShoppingBag class="h-8 w-8" />
											</div>
										{/if}
									</div>
									<div class="flex-1">
										<h3 class="font-semibold">{item.product_name}</h3>
										<p class="text-gray-600">{(item.price / 100).toFixed(2)}€</p>
									</div>
									<div class="flex items-center gap-2">
										<Button variant="outline" size="icon" onclick={() => updateQuantity(item.id, -1)}>
											<Minus class="h-4 w-4" />
										</Button>
										<span class="w-8 text-center font-medium">{item.quantity}</span>
										<Button variant="outline" size="icon" onclick={() => updateQuantity(item.id, 1)}>
											<Plus class="h-4 w-4" />
										</Button>
									</div>
									<div class="text-right">
										<p class="font-semibold">{((item.price * item.quantity) / 100).toFixed(2)}€</p>
									</div>
									<Button variant="ghost" size="icon" onclick={() => removeItem(item.id)}>
										<Trash2 class="h-4 w-4 text-red-500" />
									</Button>
								</div>
							{/each}
						</div>
					</Card.Content>
				</Card.Root>
			</div>

			<div class="lg:col-span-1">
				<Card.Root class="sticky top-6">
					<Card.Content class="space-y-4">
						<div>
							<h3 class="font-semibold mb-2">{m["cart.order_summary"]()}</h3>
							<div class="space-y-2">
								<div class="flex justify-between">
									<span class="text-gray-600">{m["cart.subtotal"]()}</span>
									<span>{(cart.subtotal / 100).toFixed(2)}€</span>
								</div>
								<div class="flex justify-between">
									<span class="text-gray-600">{m["cart.delivery_fee"]()}</span>
									<span>{(cart.delivery_fee / 100).toFixed(2)}€</span>
								</div>
								<div class="flex justify-between text-lg font-bold pt-2 border-t">
									<span>{m["cart.total"]()}</span>
									<span>{(cart.total / 100).toFixed(2)}€</span>
								</div>
							</div>
						</div>
						<div class="space-y-2">
							<Button onclick={checkout} class="w-full">
								{m["cart.checkout"]()}
							</Button>
							<Button variant="outline" onclick={clearCart} class="w-full">
								{m["cart.clear_cart"]()}
							</Button>
						</div>
					</Card.Content>
				</Card.Root>
			</div>
		</div>
	{/if}
</div>
