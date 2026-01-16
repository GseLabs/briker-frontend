<script lang="ts">
	import { createQuery, useMutation } from "@tanstack/svelte-query";
	import { env } from "$env/dynamic/public";
	import * as m from "$lib/paraglide/messages";
	import { showErrorToast, showSuccessToast } from "$lib/utils/toast";
	import { Save, X } from "@lucide/svelte/icons";
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";

	type DeliveryFeeConfig = {
		base_fee_cents: number;
		fee_per_km_cents: number;
		max_fee_cents: number;
	};

	const configQuery = createQuery(() => ({
		queryKey: ["admin", "delivery-fee-config"],
		queryFn: async () => {
			const response = await fetch(`${env.PUBLIC_API_BASE_PATH}/admin/delivery-fee-config`, {
				headers: {
					"Content-Type": "application/json"
				},
				credentials: "include"
			});
			if (!response.ok) {
				throw new Error("Failed to fetch delivery fee config");
			}
			return await response.json();
		},
		staleTime: 1000 * 60 * 5
	}));

	const config = $derived(configQuery.data || {
		base_fee_cents: 0,
		fee_per_km_cents: 0,
		max_fee_cents: 0
	});

	const loading = $derived(configQuery.isLoading);

	$effect(() => {
		showErrorToast(configQuery, m["common.error_loading"]());
	});

	let baseFee = $state(0);
	let feePerKm = $state(0);
	let maxFee = $state(0);

	$effect(() => {
		baseFee = config.base_fee_cents / 100;
		feePerKm = config.fee_per_km_cents / 100;
		maxFee = config.max_fee_cents / 100;
	});

	const updateMutation = useMutation({
		mutationFn: async () => {
			const response = await fetch(`${env.PUBLIC_API_BASE_PATH}/admin/delivery-fee-config`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				credentials: "include",
				body: JSON.stringify({
					base_fee_cents: Math.round(baseFee * 100),
					fee_per_km_cents: Math.round(feePerKm * 100),
					max_fee_cents: Math.round(maxFee * 100)
				})
			});

			if (!response.ok) {
				throw new Error("Failed to update delivery fee config");
			}
			return await response.json();
		},
		onSuccess: () => {
			showSuccessToast(m["admin.delivery_fee_updated"]());
			configQuery.refetch();
		},
		onError: (error) => {
			showErrorToast(null, m["admin.error_updating_delivery_fee"]());
		}
	});

	function handleSave() {
		updateMutation.mutate();
	}

	function handleReset() {
		baseFee = config.base_fee_cents / 100;
		feePerKm = config.fee_per_km_cents / 100;
		maxFee = config.max_fee_cents / 100;
	}
</script>

<div class="p-6">
	<h1 class="text-2xl font-bold mb-6">{m["admin.delivery_fee_management"]()}</h1>

	<Card.Root>
		<Card.Content class="space-y-6">
			{#if loading}
				<div class="flex justify-center items-center h-64">
					<div class="text-gray-500">{m["common.loading"]()}</div>
				</div>
			{:else}
				<div class="grid md:grid-cols-2 gap-6">
					<div>
						<Label for="baseFee">{m["admin.base_fee"]()} (€)</Label>
						<Input
							id="baseFee"
							type="number"
							step="0.01"
							bind:value={baseFee}
							min="0"
						/>
						<p class="text-sm text-gray-500 mt-1">{m["admin.base_fee_desc"]()}</p>
					</div>

					<div>
						<Label for="feePerKm">{m["admin.fee_per_km"]()} (€/km)</Label>
						<Input
							id="feePerKm"
							type="number"
							step="0.01"
							bind:value={feePerKm}
							min="0"
						/>
						<p class="text-sm text-gray-500 mt-1">{m["admin.fee_per_km_desc"]()}</p>
					</div>

					<div>
						<Label for="maxFee">{m["admin.max_fee"]()} (€)</Label>
						<Input
							id="maxFee"
							type="number"
							step="0.01"
							bind:value={maxFee}
							min="0"
						/>
						<p class="text-sm text-gray-500 mt-1">{m["admin.max_fee_desc"]()}</p>
					</div>
				</div>

				<div class="pt-4 border-t">
					<div class="flex gap-2">
						<Button onclick={handleSave} disabled={updateMutation.isPending}>
							{#if updateMutation.isPending}
								{m["common.saving"]()}
							{:else}
								<Save class="h-4 w-4 mr-2" />
								{m["common.save"]()}
							{/if}
						</Button>
						<Button variant="outline" onclick={handleReset} disabled={updateMutation.isPending}>
							<X class="h-4 w-4 mr-2" />
							{m["common.reset"]()}
						</Button>
					</div>
				</div>
			{/if}
		</Card.Content>
	</Card.Root>
</div>
