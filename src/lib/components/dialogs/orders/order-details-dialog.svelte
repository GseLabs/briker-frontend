<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import * as m from "$lib/paraglide/messages";
	import { createMutation, useQueryClient } from "@tanstack/svelte-query";
	import { api } from "$lib/api";
	import { toast } from "svelte-sonner";

	type OrderItem = {
		id: string;
		product: {
			id: string;
			name: string;
			price: number;
			image_url: string | null;
		};
		quantity: number;
		unit_price: number;
		total_price: number;
	};

	type Order = {
		id: string;
		status: string;
		payment_status: string;
		payment_method: string;
		order_type: string;
		currency: string;
		subtotal_amount: number;
		discount_amount: number;
		tax_amount: number;
		delivery_fee: number;
		total_amount: number;
		delivery_address: {
			street: string;
			city: string;
			postal_code: string;
			country: string;
		} | null;
		contact_name: string | null;
		contact_phone: string | null;
		note: string | null;
		scheduled_at: string | null;
		delivered_at: string | null;
		items: OrderItem[];
		client_id: string;
		client_email: string | null;
		client_name: string | null;
		vendor_id: string;
		vendor_name: string | null;
		created_at: string;
		updated_at: string;
	};

	let { open, order }: { open: boolean; order: Order | null } = $props();

	const queryClient = useQueryClient();

	const updateStatusMutation = createMutation(() => ({
		mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
			const response = await fetch(`/api/admin/orders/${orderId}/status`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ status })
			});
			if (!response.ok) {
				throw new Error("Failed to update status");
			}
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
			toast.success(m["orders.status_updated"]() || "Status updated");
		},
		onError: () => {
			toast.error(m["orders.status_update_failed"]() || "Failed to update status");
		}
	}));

	const updatePaymentStatusMutation = createMutation(() => ({
		mutationFn: async ({ orderId, paymentStatus }: { orderId: string; paymentStatus: string }) => {
			const response = await fetch(`/api/admin/orders/${orderId}/payment-status`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ payment_status: paymentStatus })
			});
			if (!response.ok) {
				throw new Error("Failed to update payment status");
			}
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
			toast.success(m["orders.payment_status_updated"]() || "Payment status updated");
		},
		onError: () => {
			toast.error(m["orders.payment_status_update_failed"]() || "Failed to update payment status");
		}
	}));

	function getStatusBadge(status: string): { text: string; color: string } {
		switch (status) {
			case "pending":
				return { text: m["orders.status_pending"]() || "Pending", color: "bg-yellow-100 text-yellow-800" };
			case "confirmed":
				return { text: m["orders.status_confirmed"]() || "Confirmed", color: "bg-blue-100 text-blue-800" };
			case "preparing":
				return { text: m["orders.status_preparing"]() || "Preparing", color: "bg-purple-100 text-purple-800" };
			case "ready_for_pickup":
				return { text: m["orders.status_ready"]() || "Ready", color: "bg-indigo-100 text-indigo-800" };
			case "out_for_delivery":
				return { text: m["orders.status_out"]() || "Out", color: "bg-orange-100 text-orange-800" };
			case "delivered":
				return { text: m["orders.status_delivered"]() || "Delivered", color: "bg-green-100 text-green-800" };
			case "cancelled":
				return { text: m["orders.status_cancelled"]() || "Cancelled", color: "bg-red-100 text-red-800" };
			case "refunded":
				return { text: m["orders.status_refunded"]() || "Refunded", color: "bg-gray-100 text-gray-800" };
			default:
				return { text: status, color: "bg-gray-100 text-gray-800" };
		}
	}

	function getPaymentStatusBadge(status: string): { text: string; color: string } {
		switch (status) {
			case "pending":
				return { text: m["orders.payment_pending"]() || "Pending", color: "bg-yellow-100 text-yellow-800" };
			case "processing":
				return { text: m["orders.payment_processing"]() || "Processing", color: "bg-blue-100 text-blue-800" };
			case "paid":
				return { text: m["orders.payment_paid"]() || "Paid", color: "bg-green-100 text-green-800" };
			case "failed":
				return { text: m["orders.payment_failed"]() || "Failed", color: "bg-red-100 text-red-800" };
			case "refunded":
				return { text: m["orders.payment_refunded"]() || "Refunded", color: "bg-gray-100 text-gray-800" };
			default:
				return { text: status, color: "bg-gray-100 text-gray-800" };
		}
	}

	const orderStatuses = [
		{ value: "pending", label: m["orders.status_pending"]() || "Pending" },
		{ value: "confirmed", label: m["orders.status_confirmed"]() || "Confirmed" },
		{ value: "preparing", label: m["orders.status_preparing"]() || "Preparing" },
		{ value: "ready_for_pickup", label: m["orders.status_ready"]() || "Ready for Pickup" },
		{ value: "out_for_delivery", label: m["orders.status_out"]() || "Out for Delivery" },
		{ value: "delivered", label: m["orders.status_delivered"]() || "Delivered" },
		{ value: "cancelled", label: m["orders.status_cancelled"]() || "Cancelled" },
		{ value: "refunded", label: m["orders.status_refunded"]() || "Refunded" }
	];

	const paymentStatuses = [
		{ value: "pending", label: m["orders.payment_pending"]() || "Pending" },
		{ value: "processing", label: m["orders.payment_processing"]() || "Processing" },
		{ value: "paid", label: m["orders.payment_paid"]() || "Paid" },
		{ value: "failed", label: m["orders.payment_failed"]() || "Failed" },
		{ value: "refunded", label: m["orders.payment_refunded"]() || "Refunded" }
	];

	let selectedStatus = $state("");
	let selectedPaymentStatus = $state("");
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-w-4xl max-h-[90vh] overflow-y-auto">
		{#if order}
			<Dialog.Header>
				<Dialog.Title>
					{m["orders.order_details"]() || "Order Details"} - {order.id.slice(0, 8)}
				</Dialog.Title>
				<Dialog.Description>
					{new Date(order.created_at).toLocaleString()}
				</Dialog.Description>
			</Dialog.Header>

			<div class="space-y-6 py-4">
				<div class="grid grid-cols-2 gap-4">
					<Card.Root>
						<Card.Header>
							<Card.Title class="text-sm">{m["orders.status"]() || "Status"}</Card.Title>
						</Card.Header>
						<Card.Content>
							<div class="space-y-2">
								<Badge class={getStatusBadge(order.status).color}>
									{getStatusBadge(order.status).text}
								</Badge>
								<select
									bind:value={selectedStatus}
									class="w-full mt-2 rounded border p-2 text-sm"
									onchange={(e) => {
										if (e.target.value) {
											updateStatusMutation.mutate({
												orderId: order.id,
												status: e.target.value
											});
										}
									}}
								>
									<option value="">{m["orders.change_status"]() || "Change status"}</option>
									{#each orderStatuses as status}
										{#if status.value !== order.status}
											<option value={status.value}>{status.label}</option>
										{/if}
									{/each}
								</select>
							</div>
						</Card.Content>
					</Card.Root>

					<Card.Root>
						<Card.Header>
							<Card.Title class="text-sm">{m["orders.payment_status"]() || "Payment Status"}</Card.Title>
						</Card.Header>
						<Card.Content>
							<div class="space-y-2">
								<Badge class={getPaymentStatusBadge(order.payment_status).color}>
									{getPaymentStatusBadge(order.payment_status).text}
								</Badge>
								<select
									bind:value={selectedPaymentStatus}
									class="w-full mt-2 rounded border p-2 text-sm"
									onchange={(e) => {
										if (e.target.value) {
											updatePaymentStatusMutation.mutate({
												orderId: order.id,
												paymentStatus: e.target.value
											});
										}
									}}
								>
									<option value="">{m["orders.change_payment_status"]() || "Change payment status"}</option>
									{#each paymentStatuses as status}
										{#if status.value !== order.payment_status}
											<option value={status.value}>{status.label}</option>
										{/if}
									{/each}
								</select>
							</div>
						</Card.Content>
					</Card.Root>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<Card.Root>
						<Card.Header>
							<Card.Title class="text-sm">{m["orders.client"]() || "Client"}</Card.Title>
						</Card.Header>
						<Card.Content class="space-y-1 text-sm">
							<div><strong>{m["orders.name"]() || "Name"}:</strong> {order.client_name || "-"}</div>
							<div><strong>{m["orders.email"]() || "Email"}:</strong> {order.client_email || "-"}</div>
						</Card.Content>
					</Card.Root>

					<Card.Root>
						<Card.Header>
							<Card.Title class="text-sm">{m["orders.vendor"]() || "Vendor"}</Card.Title>
						</Card.Header>
						<Card.Content class="space-y-1 text-sm">
							<div><strong>{m["orders.name"]() || "Name"}:</strong> {order.vendor_name || "-"}</div>
						</Card.Content>
					</Card.Root>
				</div>

				{#if order.delivery_address}
					<Card.Root>
						<Card.Header>
							<Card.Title class="text-sm">{m["orders.delivery_address"]() || "Delivery Address"}</Card.Title>
						</Card.Header>
						<Card.Content class="text-sm">
							{order.delivery_address.street}<br />
							{order.delivery_address.postal_code} {order.delivery_address.city}<br />
							{order.delivery_address.country}
						</Card.Content>
					</Card.Root>
				{/if}

				{#if order.contact_name || order.contact_phone}
					<Card.Root>
						<Card.Header>
							<Card.Title class="text-sm">{m["orders.contact"]() || "Contact"}</Card.Title>
						</Card.Header>
						<Card.Content class="text-sm space-y-1">
							{#if order.contact_name}
								<div><strong>{m["orders.name"]() || "Name"}:</strong> {order.contact_name}</div>
							{/if}
							{#if order.contact_phone}
								<div><strong>{m["orders.phone"]() || "Phone"}:</strong> {order.contact_phone}</div>
							{/if}
						</Card.Content>
					</Card.Root>
				{/if}

				{#if order.note}
					<Card.Root>
						<Card.Header>
							<Card.Title class="text-sm">{m["orders.note"]() || "Note"}</Card.Title>
						</Card.Header>
						<Card.Content class="text-sm">{order.note}</Card.Content>
					</Card.Root>
				{/if}

				<Card.Root>
					<Card.Header>
						<Card.Title class="text-sm">{m["orders.items"]() || "Items"}</Card.Title>
					</Card.Header>
					<Card.Content>
						<div class="space-y-3">
							{#each order.items as item}
								<div class="flex items-start gap-3 border-b pb-3 last:border-0">
									{#if item.product.image_url}
										<img
											src={item.product.image_url}
											alt={item.product.name}
											class="h-16 w-16 rounded object-cover"
										/>
									{:else}
										<div class="h-16 w-16 rounded bg-gray-200" />
									{/if}
									<div class="flex-1">
										<div class="font-medium">{item.product.name}</div>
										<div class="text-sm text-muted-foreground">
											{m["orders.quantity"]() || "Qty"}: {item.quantity} × {(item.unit_price / 100).toFixed(2)} {order.currency}
										</div>
									</div>
									<div class="font-medium">
										{(item.total_price / 100).toFixed(2)} {order.currency}
									</div>
								</div>
							{/each}
						</div>
					</Card.Content>
				</Card.Root>

				<Card.Root>
					<Card.Header>
						<Card.Title class="text-sm">{m["orders.summary"]() || "Summary"}</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-2 text-sm">
						<div class="flex justify-between">
							<span>{m["orders.subtotal"]() || "Subtotal"}:</span>
							<span>{(order.subtotal_amount / 100).toFixed(2)} {order.currency}</span>
						</div>
						{#if order.discount_amount > 0}
							<div class="flex justify-between text-green-600">
								<span>{m["orders.discount"]() || "Discount"}:</span>
								<span>-{(order.discount_amount / 100).toFixed(2)} {order.currency}</span>
							</div>
						{/if}
						{#if order.tax_amount > 0}
							<div class="flex justify-between">
								<span>{m["orders.tax"]() || "Tax"}:</span>
								<span>{(order.tax_amount / 100).toFixed(2)} {order.currency}</span>
							</div>
						{/if}
						{#if order.delivery_fee > 0}
							<div class="flex justify-between">
								<span>{m["orders.delivery_fee"]() || "Delivery Fee"}:</span>
								<span>{(order.delivery_fee / 100).toFixed(2)} {order.currency}</span>
							</div>
						{/if}
						<div class="flex justify-between border-t pt-2 font-bold">
							<span>{m["orders.total"]() || "Total"}:</span>
							<span>{(order.total_amount / 100).toFixed(2)} {order.currency}</span>
						</div>
					</Card.Content>
				</Card.Root>
			</div>

			<Dialog.Footer>
				<Button onclick={() => (open = false)}>{m["common.close"]() || "Close"}</Button>
			</Dialog.Footer>
		{/if}
	</Dialog.Content>
</Dialog.Root>
