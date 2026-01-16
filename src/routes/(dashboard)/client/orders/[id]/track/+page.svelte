<script lang="ts">
	import { createQuery } from "@tanstack/svelte-query";
	import { env } from "$env/dynamic/public";
	import * as m from "$lib/paraglide/messages";
	import { showErrorToast } from "$lib/utils/toast";
	import { page } from "$app/stores";
	import { ArrowLeft, CheckCircle2, Clock, Package, Truck } from "@lucide/svelte/icons";
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { Badge } from "$lib/components/ui/badge";
	import { Progress } from "$lib/components/ui/progress";

	type TrackingStep = {
		status: string;
		label: string;
		completed: boolean;
		timestamp: string | null;
	};

	type OrderTracking = {
		order_id: string;
		status: string;
		progress: number;
		steps: TrackingStep[];
		estimated_delivery: string | null;
	};

	const orderId = $page.params.id;

	const trackingQuery = createQuery(() => ({
		queryKey: ["client", "orders", orderId, "track"],
		queryFn: async () => {
			const response = await fetch(`${env.PUBLIC_API_BASE_PATH}/client/orders/${orderId}/track`, {
				headers: {
					"Content-Type": "application/json"
				},
				credentials: "include"
			});
			if (!response.ok) {
				throw new Error("Failed to fetch order tracking");
			}
			return await response.json();
		},
		staleTime: 1000 * 30
	}));

	const tracking = $derived(trackingQuery.data);
	const loading = $derived(trackingQuery.isLoading);

	$effect(() => {
		showErrorToast(trackingQuery, m["common.error_loading"]());
	});

	function getStepIcon(step: TrackingStep) {
		if (step.completed) {
			return CheckCircle2;
		}
		return Clock;
	}

	function formatTimestamp(timestamp: string | null): string {
		if (!timestamp) return "";
		return new Date(timestamp).toLocaleDateString("fr-FR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		});
	}
</script>

<div class="p-6">
	<Button href={`/dashboard/client/orders/${orderId}`} variant="ghost" class="mb-6">
		<ArrowLeft class="h-4 w-4 mr-2" />
		{m["common.back"]()}
	</Button>

	{#if loading}
		<div class="flex justify-center items-center h-64">
			<div class="text-gray-500">{m["common.loading"]()}</div>
		</div>
	{:else if tracking}
		<div class="max-w-2xl mx-auto space-y-6">
			<div class="flex justify-between items-center mb-4">
				<div>
					<h1 class="text-2xl font-bold">{m["orders.track_order"]()}</h1>
					<p class="text-gray-500">#{tracking.order_id.slice(0, 8)}</p>
				</div>
				<Badge variant={tracking.status === "delivered" ? "default" : "secondary"}>
					{tracking.status}
				</Badge>
			</div>

			<Card.Root>
				<Card.Content class="space-y-6">
					<div>
						<div class="flex justify-between mb-2">
							<span class="text-sm font-medium text-gray-600">{m["orders.delivery_progress"]()}</span>
							<span class="text-sm font-bold">{Math.round(tracking.progress)}%</span>
						</div>
						<Progress value={tracking.progress} class="h-2" />
					</div>

					<div class="space-y-4">
						{#each tracking.steps as step}
							{@const StepIcon = getStepIcon(step)}
							<div class="flex gap-4">
								<div class="flex flex-col items-center">
									<div class={`p-2 rounded-full ${step.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
										<StepIcon class="h-5 w-5" />
									</div>
									{#if step.index !== tracking.steps.length - 1}
										<div class="w-0.5 h-16 bg-gray-200"></div>
									{/if}
								</div>
								<div class="flex-1">
									<p class={`font-semibold ${step.completed ? 'text-green-600' : 'text-gray-400'}`}>
										{step.label}
									</p>
									{#if step.timestamp}
										<p class="text-sm text-gray-500">{formatTimestamp(step.timestamp)}</p>
									{/if}
								</div>
							</div>
						{/each}
					</div>

					{#if tracking.estimated_delivery}
						<div class="pt-4 border-t">
							<div class="flex items-center gap-2 text-sm text-gray-600">
								<Truck class="h-4 w-4" />
								<p>{m["orders.estimated_delivery"]} : <span class="font-medium text-gray-900">{formatTimestamp(tracking.estimated_delivery)}</span></p>
							</div>
						</div>
					{/if}
				</Card.Content>
			</Card.Root>

			<Button href={`/dashboard/client/orders/${orderId}`} variant="outline" class="w-full">
				<Package class="h-4 w-4 mr-2" />
				{m["orders.view_order_details"]()}
			</Button>
		</div>
	{/if}
</div>
