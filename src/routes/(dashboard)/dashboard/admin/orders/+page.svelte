<script lang="ts">
	import {
		type ColumnDef,
		type PaginationState,
		type SortingState,
		type ColumnFiltersState,
		type VisibilityState,
		type RowSelectionState,
		getCoreRowModel,
		getPaginationRowModel,
		getSortedRowModel,
		getFilteredRowModel
	} from "@tanstack/table-core";
	import {
		createSvelteTable,
		FlexRender,
		renderComponent
	} from "$lib/components/ui/data-table/index.js";
	import * as Table from "$lib/components/ui/table/index.js";
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Checkbox } from "$lib/components/ui/checkbox";
	import DataTableToolbar from "$lib/components/ui/data-table/data-table-toolbar.svelte";
	import { createQuery } from "@tanstack/svelte-query";
	import { env } from "$env/dynamic/public";
	import * as m from "$lib/paraglide/messages";
	import { showErrorToast } from "$lib/utils/toast";
	import DataTableColumnHeader from "$lib/components/table/data-table-column-header.svelte";
	import IdCell from "$lib/components/ui/table/cells/id-cell.svelte";
	import DateCell from "$lib/components/ui/table/cells/date-cell.svelte";
	import OrderDetailsDialog from "$lib/components/dialogs/orders/order-details-dialog.svelte";

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
		contact_name: string | null;
		contact_phone: string | null;
		note: string | null;
		scheduled_at: string | null;
		delivered_at: string | null;
		created_at: string;
		updated_at: string;
		items_count: number;
		client_email: string | null;
		client_name: string | null;
		vendor_name: string | null;
	};

	const ordersQuery = createQuery(() => ({
		queryKey: ["admin", "orders"],
		queryFn: async () => {
			const response = await fetch(`${env.PUBLIC_API_BASE_PATH}/admin/orders`, {
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
		staleTime: 1000 * 60 * 5
	}));

	const orders = $derived(ordersQuery.data || []);
	const loading = $derived(ordersQuery.isLoading);

	$effect(() => {
		showErrorToast(ordersQuery, m["common.error_loading"]());
	});

	let selectedOrder = $state<Order | null>(null);
	let isDialogOpen = $state(false);

	function openOrderDetails(order: Order) {
		selectedOrder = order;
		isDialogOpen = true;
	}

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

	const columns: ColumnDef<Order>[] = [
		{
			id: "select",
			header: ({ table }) =>
				renderComponent(Checkbox, {
					checked: table.getIsAllPageRowsSelected(),
					indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
					onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
					"aria-label": m["orders.select_all"]() || "Select all"
				}),
			cell: ({ row }) =>
				renderComponent(Checkbox, {
					checked: row.getIsSelected(),
					onCheckedChange: (value) => row.toggleSelected(!!value),
					"aria-label": m["orders.select_row"]() || "Select row"
				}),
			enableSorting: false,
			enableHiding: false
		},
		{
			accessorKey: "id",
			header: ({ column }) =>
				renderComponent(DataTableColumnHeader, {
					column,
					title: "ID"
				}),
			cell: ({ row }) => renderComponent(IdCell, { id: row.getValue("id") as string })
		},
		{
			accessorKey: "status",
			header: ({ column }) =>
				renderComponent(DataTableColumnHeader, {
					column,
					title: m["orders.status"]() || "Status"
				}),
			cell: ({ row }) => {
				const status = row.getValue("status") as string;
				const badge = getStatusBadge(status);
				return `<span class="px-2 py-1 rounded-full text-xs font-medium ${badge.color}">${badge.text}</span>`;
			}
		},
		{
			accessorKey: "payment_status",
			header: ({ column }) =>
				renderComponent(DataTableColumnHeader, {
					column,
					title: m["orders.payment_status"]() || "Payment"
				}),
			cell: ({ row }) => {
				const status = row.getValue("payment_status") as string;
				const badge = getPaymentStatusBadge(status);
				return `<span class="px-2 py-1 rounded-full text-xs font-medium ${badge.color}">${badge.text}</span>`;
			}
		},
		{
			accessorKey: "total_amount",
			header: ({ column }) =>
				renderComponent(DataTableColumnHeader, {
					column,
					title: m["orders.total"]() || "Total"
				}),
			cell: ({ row }) => {
				const amount = row.getValue("total_amount") as number;
				const currency = row.original.currency;
				return `${(amount / 100).toFixed(2)} ${currency}`;
			}
		},
		{
			accessorKey: "client_email",
			header: ({ column }) =>
				renderComponent(DataTableColumnHeader, {
					column,
					title: m["orders.client"]() || "Client"
				}),
			cell: ({ row }) => row.getValue("client_email") as string || "-"
		},
		{
			accessorKey: "vendor_name",
			header: ({ column }) =>
				renderComponent(DataTableColumnHeader, {
					column,
					title: m["orders.vendor"]() || "Vendor"
				}),
			cell: ({ row }) => row.getValue("vendor_name") as string || "-"
		},
		{
			accessorKey: "created_at",
			header: ({ column }) =>
				renderComponent(DataTableColumnHeader, {
					column,
					title: m["orders.created_at"]() || "Created"
				}),
			cell: ({ row }) => renderComponent(DateCell, { date: row.getValue("created_at") as string })
		}
	];

	let sorting = $state<SortingState>([]);
	let columnFilters = $state<ColumnFiltersState>([]);
	let columnVisibility = $state<VisibilityState>({});
	let rowSelection = $state<RowSelectionState>({});
	let pagination = $state<PaginationState>({
		pageIndex: 0,
		pageSize: 20
	});

	const table = createSvelteTable({
		get data() {
			return orders;
		},
		get columns() {
			return columns;
		},
		state: {
			get sorting() {
				return sorting;
			},
			get columnFilters() {
				return columnFilters;
			},
			get columnVisibility() {
				return columnVisibility;
			},
			get rowSelection() {
				return rowSelection;
			},
			get pagination() {
				return pagination;
			}
		},
		onSortingChange: (updater) => {
			sorting = typeof updater === "function" ? updater(sorting) : updater;
		},
		onColumnFiltersChange: (updater) => {
			columnFilters = typeof updater === "function" ? updater(columnFilters) : updater;
		},
		onColumnVisibilityChange: (updater) => {
			columnVisibility = typeof updater === "function" ? updater(columnVisibility) : updater;
		},
		onRowSelectionChange: (updater) => {
			rowSelection = typeof updater === "function" ? updater(rowSelection) : updater;
		},
		onPaginationChange: (updater) => {
			pagination = typeof updater === "function" ? updater(pagination) : updater;
		},
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel()
	});
</script>

<div class="space-y-6 p-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">{m["orders.title"]() || "Orders"}</h1>
			<p class="text-muted-foreground">{m["orders.description"]() || "Manage and track all orders"}</p>
		</div>
	</div>

	<Card.Root>
		<Card.Content class="p-0">
			<DataTableToolbar table={table} />
			<div class="rounded-md border">
				<Table.Root>
					<Table.Header>
						{#each table.getHeaderGroups() as headerGroup}
							<Table.Row>
								{#each headerGroup.headers as header}
									<Table.Head class="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
										{#if header.isPlaceholder}
											<FlexRender
												{render}
												component={header.column.columnDef.header}
												props={header.getContext()}
											/>
										{:else}
											{header.column.columnDef.header}
										{/if}
									</Table.Head>
								{/each}
							</Table.Row>
						{/each}
					</Table.Header>
					<Table.Body>
						{#if loading}
							<Table.Row>
								<Table.Cell colspan={columns.length} class="h-24 text-center">
									<div class="flex items-center justify-center">
										<div class="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
									</div>
								</Table.Cell>
							</Table.Row>
						{:else if table.getRowModel().rows?.length === 0}
							<Table.Row>
								<Table.Cell colspan={columns.length} class="h-24 text-center">
									{m["orders.no_orders"]() || "No orders found"}
								</Table.Cell>
							</Table.Row>
						{:else}
							{#each table.getRowModel().rows as row (row.id)}
								<Table.Row
									data-state={row.getIsSelected() && "selected"}
									class="hover:bg-muted/50 data-[state=selected]:bg-muted cursor-pointer"
									onclick={() => openOrderDetails(row.original)}
								>
									{#each row.getVisibleCells() as cell}
										<Table.Cell class="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
											<FlexRender
												{render}
												component={cell.column.columnDef.cell}
												props={cell.getContext()}
											/>
										</Table.Cell>
									{/each}
								</Table.Row>
							{/each}
						{/if}
					</Table.Body>
				</Table.Root>
			</div>
			<div class="flex items-center justify-end space-x-2 py-4">
				<div class="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div class="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onclick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						{m["common.previous"]() || "Previous"}
					</Button>
					<Button
						variant="outline"
						size="sm"
						onclick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						{m["common.next"]() || "Next"}
					</Button>
				</div>
			</div>
		</Card.Content>
	</Card.Root>

	<OrderDetailsDialog bind:open={isDialogOpen} order={selectedOrder} />
</div>
