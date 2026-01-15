<script lang="ts">
	import * as Chart from "$lib/components/ui/chart/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { PieChart } from "layerchart";
	import { createQuery } from "@tanstack/svelte-query";
	import { AdminApi, type SchemaRole } from "$lib/api/client";
	import { apiConfig } from "$lib/api/config";
	import * as m from "$lib/paraglide/messages";

	const adminApi = new AdminApi(apiConfig);

	const usersQuery = createQuery(() => ({
		queryKey: ["users"],
		queryFn: async () => {
			const response = await adminApi.adminUsersGet({
				limit: 1000,
				page: 1
			});
			return response.users || [];
		},
		staleTime: 1000 * 60 * 5
	}));

	const chartData = $derived(() => {
		if (!usersQuery.data) return [];

		const roleCount = usersQuery.data.reduce(
			(acc, user) => {
				const role = user.role || "unknown";
				acc[role] = (acc[role] || 0) + 1;
				return acc;
			},
			{} as Record<string, number>
		);

		const colors = {
			admin: "var(--chart-1)",
			vendor: "var(--chart-2)",
			vendor_employee: "var(--chart-3)",
			courier: "var(--chart-4)",
			client: "var(--chart-5)",
			unknown: "var(--chart-6)"
		};

		return Object.entries(roleCount).map(([role, count]) => ({
			role,
			count,
			color: colors[role as keyof typeof colors] || "var(--chart-6)"
		}));
	});

	const chartConfig = $derived({
		count: { label: m["users.users"]() },
		admin: { label: m["roles.admin"](), color: "var(--chart-1)" },
		vendor: { label: m["roles.vendor"](), color: "var(--chart-2)" },
		vendor_employee: { label: m["roles.vendor_employee"](), color: "var(--chart-3)" },
		courier: { label: m["roles.courier"](), color: "var(--chart-4)" },
		client: { label: m["roles.client"](), color: "var(--chart-5)" },
		unknown: { label: m["common.unknown"](), color: "var(--chart-6)" }
	} satisfies Chart.ChartConfig);

	const totalUsers = $derived(chartData().reduce((sum, item) => sum + item.count, 0));
</script>

<Card.Root class="flex flex-col">
	<Card.Header class="items-center pb-0">
		<Card.Title>{m["users.distribution"]()}</Card.Title>
		<Card.Description>{m["users.distribution_description"]()}</Card.Description>
	</Card.Header>
	<Card.Content class="flex-1 pb-0">
		{#if usersQuery.isLoading}
			<div class="flex h-[250px] items-center justify-center">
				<div class="animate-pulse text-muted-foreground">{m["common.loading_chart"]()}</div>
			</div>
		{:else if chartData().length > 0}
			<Chart.Container config={chartConfig} class="mx-auto aspect-square max-h-[250px]">
				<PieChart
					data={chartData()}
					key="role"
					value="count"
					c="color"
					innerRadius={60}
					padding={20}
					props={{ pie: { motion: "tween" } }}
					legend
				>
					{#snippet tooltip()}
						<Chart.Tooltip hideLabel />
					{/snippet}
				</PieChart>
			</Chart.Container>
		{:else}
			<div class="flex h-[250px] items-center justify-center text-muted-foreground">
				{m["common.no_data_available"]()}
			</div>
		{/if}
	</Card.Content>
	<Card.Footer class="flex-col gap-2 text-sm">
		<div class="flex items-center gap-2 leading-none font-medium">
			{m["common.total"]()}: {totalUsers.toLocaleString()}
			{totalUsers > 1 ? m["users.users"]() : m["users.user"]()}
		</div>
	</Card.Footer>
</Card.Root>
