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
	import Plus from "@lucide/svelte/icons/plus";
	import { createQuery, createMutation, useQueryClient } from "@tanstack/svelte-query";
	import { api } from "$lib/api";
	import * as m from "$lib/paraglide/messages";
	import type { RoutesProductResponse } from "$lib/api/client";
	import type { ProductStatus } from "$lib/api/client";
	import DataTableColumnHeader from "$lib/components/table/data-table-column-header.svelte";
	import { showErrorToast } from "$lib/utils/toast";
	import CompactIdCell from "$lib/components/ui/table/cells/compact-id-cell.svelte";
	import NameCell from "$lib/components/ui/table/cells/name-cell.svelte";
	import TextCell from "$lib/components/ui/table/cells/text-cell.svelte";
	import StatusBadgeCell from "$lib/components/ui/table/cells/status-badge-cell.svelte";
	import ImagesCell from "$lib/components/ui/table/cells/images-cell.svelte";
	import ActionsCell from "$lib/components/ui/table/cells/actions-cell.svelte";
	import DateCell from "$lib/components/ui/table/cells/date-cell.svelte";
	import ProductImagesDialog from "$lib/components/dialogs/products/product-images-dialog.svelte";
	import ProductFormDialog from "$lib/components/dialogs/products/product-form-dialog.svelte";
	import ProductDeleteDialog from "$lib/components/dialogs/products/product-delete-dialog.svelte";
	import { formatCurrency } from "$lib/utils/currency";

	const queryClient = useQueryClient();

	// Query to fetch vendor products
	const productsQuery = createQuery(() => ({
		queryKey: ["vendor", "products"],
		queryFn: async () => {
			const response = await api.vendor.vendorProductsGet({
				limit: 100,
				page: 1
			});
			return response.products || [];
		},
		staleTime: 1000 * 60 * 5
	}));

	const products = $derived(productsQuery.data || []);
	const loading = $derived(productsQuery.isLoading);

	let selectedProductForImages = $state<RoutesProductResponse | null>(null);
	let imagesDialogOpen = $state(false);
	let selectedProductForEdit = $state<RoutesProductResponse | undefined>(undefined);
	let formDialogOpen = $state(false);
	let selectedProductForDelete = $state<RoutesProductResponse | null>(null);
	let deleteDialogOpen = $state(false);

	function openImagesDialog(product: RoutesProductResponse) {
		selectedProductForImages = product;
		imagesDialogOpen = true;
	}

	function openAddDialog() {
		selectedProductForEdit = undefined;
		formDialogOpen = true;
	}

	function openEditDialog(product: RoutesProductResponse) {
		selectedProductForEdit = product;
		formDialogOpen = true;
	}

	function openDeleteDialog(product: RoutesProductResponse) {
		selectedProductForDelete = product;
		deleteDialogOpen = true;
	}

	function handleImagesUpdate() {
		queryClient.invalidateQueries({ queryKey: ["vendor", "products"] });
	}

	function handleFormSuccess() {
		queryClient.invalidateQueries({ queryKey: ["vendor", "products"] });
	}

	function handleDeleteSuccess() {
		queryClient.invalidateQueries({ queryKey: ["vendor", "products"] });
	}

	function handleImagesDialogClose() {
		imagesDialogOpen = false;
		// Don't reset selectedProductForImages immediately to avoid UI flicker
		setTimeout(() => {
			if (!imagesDialogOpen) {
				selectedProductForImages = null;
			}
		}, 100);
	}

	function handleFormDialogClose() {
		formDialogOpen = false;
		// Don't reset selectedProductForEdit immediately to avoid UI flicker
		setTimeout(() => {
			if (!formDialogOpen) {
				selectedProductForEdit = undefined;
			}
		}, 100);
	}

	function handleDeleteDialogClose() {
		deleteDialogOpen = false;
		// Don't reset selectedProductForDelete immediately to avoid UI flicker
		setTimeout(() => {
			if (!deleteDialogOpen) {
				selectedProductForDelete = null;
			}
		}, 100);
	}

	// Show toast on error
	$effect(() => {
		showErrorToast(productsQuery, m["common.error_loading"]());
	});

	// Helper functions for status
	function getStatusColor(status?: ProductStatus): string {
		const colors = {
			active: "bg-green-100 text-green-800",
			inactive: "bg-gray-100 text-gray-800"
		};
		if (status && status in colors) {
			return colors[status as keyof typeof colors];
		}
		return "bg-gray-100 text-gray-800";
	}

	function getStatusLabel(status?: ProductStatus): string {
		const labels = {
			active: "Actif",
			inactive: "Inactif"
		};
		if (status && status in labels) {
			return labels[status as keyof typeof labels];
		}
		return "Inconnu";
	}

	// Table columns
	const columns: ColumnDef<RoutesProductResponse>[] = [
		{
			id: "select",
			header: ({ table }) =>
				renderComponent(Checkbox, {
					checked: table.getIsAllPageRowsSelected(),
					indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
					onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
					"aria-label": "Sélectionner tout"
				}),
			cell: ({ row }) =>
				renderComponent(Checkbox, {
					checked: row.getIsSelected(),
					onCheckedChange: (value) => row.toggleSelected(!!value),
					"aria-label": "Sélectionner la ligne"
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
			cell: ({ row }) => {
				return renderComponent(CompactIdCell, { id: row.getValue("id") as string });
			},
			size: 80
		},
		{
			accessorKey: "reference",
			header: ({ column }) =>
				renderComponent(DataTableColumnHeader, {
					column,
					title: "Référence"
				}),
			cell: ({ row }) => {
				return renderComponent(NameCell, { name: (row.getValue("reference") as string) || "N/A" });
			}
		},
		{
			accessorKey: "name",
			header: ({ column }) =>
				renderComponent(DataTableColumnHeader, {
					column,
					title: "Nom"
				}),
			cell: ({ row }) => {
				return renderComponent(NameCell, { name: row.getValue("name") as string });
			}
		},
		{
			accessorKey: "price",
			header: ({ column }) =>
				renderComponent(DataTableColumnHeader, {
					column,
					title: "Prix"
				}),
			cell: ({ row }) => {
				const price = row.getValue("price") as number;
				return renderComponent(NameCell, { name: price ? formatCurrency(price) : "N/A" });
			}
		},
		{
			accessorKey: "stockQuantity",
			header: ({ column }) =>
				renderComponent(DataTableColumnHeader, {
					column,
					title: "Stock"
				}),
			cell: ({ row }) => {
				const stock = row.getValue("stockQuantity") as number | undefined | null;
				let displayText: string;
				let stockClass: string;

				if (stock === null || stock === undefined) {
					displayText = "∞"; // Symbole infini
					stockClass = "text-blue-600";
				} else if (stock > 0) {
					displayText = String(stock);
					stockClass = "text-green-600";
				} else {
					displayText = String(stock);
					stockClass = "text-red-600";
				}

				return renderComponent(TextCell, {
					text: displayText,
					class: stockClass
				});
			}
		},
		{
			accessorKey: "status",
			header: ({ column }) =>
				renderComponent(DataTableColumnHeader, {
					column,
					title: "Statut"
				}),
			cell: ({ row }) => {
				const status = row.original.status as ProductStatus | undefined;
				const colorClass = getStatusColor(status);
				const displayStatus = getStatusLabel(status);
				return renderComponent(StatusBadgeCell, {
					status: displayStatus,
					colorClass
				});
			}
		},
		{
			accessorKey: "createdAt",
			header: ({ column }) =>
				renderComponent(DataTableColumnHeader, {
					column,
					title: "Créé le"
				}),
			cell: ({ row }) => {
				return renderComponent(DateCell, { date: row.getValue("createdAt") as string | undefined });
			}
		},
		{
			id: "images",
			header: "Images",
			cell: ({ row }) => {
				const product = row.original;
				const imageCount = product.productImages?.length || 0;
				return renderComponent(ImagesCell, {
					imageCount,
					onClick: () => openImagesDialog(product)
				});
			},
			enableSorting: false,
			enableHiding: false,
			size: 100
		},
		{
			id: "actions",
			cell: ({ row }) => {
				const product = row.original;
				return renderComponent(ActionsCell, {
					onEdit: () => openEditDialog(product),
					onDelete: () => openDeleteDialog(product)
				});
			},
			enableSorting: false,
			enableHiding: false,
			size: 120
		}
	];

	let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });
	let sorting = $state<SortingState>([]);
	let columnFilters = $state<ColumnFiltersState>([]);
	let columnVisibility = $state<VisibilityState>({});
	let rowSelection = $state<RowSelectionState>({});

	const table = createSvelteTable({
		get data() {
			return products;
		},
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onPaginationChange: (updater) => {
			if (typeof updater === "function") {
				pagination = updater(pagination);
			} else {
				pagination = updater;
			}
		},
		onSortingChange: (updater) => {
			if (typeof updater === "function") {
				sorting = updater(sorting);
			} else {
				sorting = updater;
			}
		},
		onColumnFiltersChange: (updater) => {
			if (typeof updater === "function") {
				columnFilters = updater(columnFilters);
			} else {
				columnFilters = columnFilters;
			}
		},
		onColumnVisibilityChange: (updater) => {
			if (typeof updater === "function") {
				columnVisibility = updater(columnVisibility);
			} else {
				columnVisibility = columnVisibility;
			}
		},
		onRowSelectionChange: (updater) => {
			if (typeof updater === "function") {
				rowSelection = updater(rowSelection);
			} else {
				rowSelection = rowSelection;
			}
		},
		state: {
			get pagination() {
				return pagination;
			},
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
			}
		}
	});
</script>

<svelte:head>
	<title>{m["sidebar.products"]()} - BRIKER</title>
	<meta name="description" content={m["vendors.manage_products"]()} />
</svelte:head>

<div class="container mx-auto p-6">
	<div class="mb-6 flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold">Mes produits</h1>
			<p class="text-muted-foreground">Gérez votre catalogue de produits</p>
		</div>
		<Button onclick={openAddDialog}>
			<Plus class="mr-2 h-4 w-4" />
			{m["products.add_product"]()}
		</Button>
	</div>

	<Card.Root>
		<Card.Content>
			{#if loading}
				<div class="flex items-center justify-center py-8">
					<div class="text-muted-foreground">{m["common.loading"]()}</div>
				</div>
			{:else if products.length === 0}
				<div class="flex flex-col items-center justify-center py-8">
					<div class="mb-4 text-center text-muted-foreground">
						<p class="text-lg font-medium">Aucun produit trouvé</p>
						<p class="mt-2 text-sm">Commencez par ajouter votre premier produit</p>
					</div>
					<Button onclick={openAddDialog}>
						<Plus class="mr-2 h-4 w-4" />
						{m["products.add_product"]()}
					</Button>
				</div>
			{:else}
				<div>
					<DataTableToolbar
						{table}
						searchColumn="name"
						columnLabels={{
							select: "Sélection",
							id: "ID",
							reference: "Référence",
							name: "Nom",
							price: "Prix",
							stockQuantity: "Stock",
							status: "Statut",
							createdAt: "Créé le",
							images: "Images",
							actions: m["common.actions"]()
						}}
					/>
					<div class="rounded-md border">
						<Table.Root>
							<Table.Header>
								{#each table.getHeaderGroups() as headerGroup}
									<Table.Row>
										{#each headerGroup.headers as header}
											<Table.Head>
												<FlexRender
													content={header.column.columnDef.header}
													context={header.getContext()}
												/>
											</Table.Head>
										{/each}
									</Table.Row>
								{/each}
							</Table.Header>
							<Table.Body>
								{#each table.getRowModel().rows as row}
									<Table.Row data-state={row.getIsSelected() && "selected"}>
										{#each row.getVisibleCells() as cell}
											<Table.Cell>
												<FlexRender
													content={cell.column.columnDef.cell}
													context={cell.getContext()}
												/>
											</Table.Cell>
										{/each}
									</Table.Row>
								{:else}
									<Table.Row>
										<Table.Cell colspan={columns.length} class="h-24 text-center">
											Aucun produit trouvé
										</Table.Cell>
									</Table.Row>
								{/each}
							</Table.Body>
						</Table.Root>
					</div>
					<div class="flex items-center justify-between space-x-2 py-4">
						<div class="flex-1 text-sm text-muted-foreground">
							{table.getFilteredSelectedRowModel().rows.length} sur {table.getFilteredRowModel()
								.rows.length} ligne(s) sélectionnée(s)
						</div>
						<div class="space-x-2">
							<Button
								variant="outline"
								size="sm"
								onclick={() => table.previousPage()}
								disabled={!table.getCanPreviousPage()}
							>
								Précédent
							</Button>
							<Button
								variant="outline"
								size="sm"
								onclick={() => table.nextPage()}
								disabled={!table.getCanNextPage()}
							>
								Suivant
							</Button>
						</div>
					</div>
				</div>
			{/if}
		</Card.Content>
	</Card.Root>
</div>

{#if selectedProductForImages}
	<ProductImagesDialog
		product={selectedProductForImages}
		bind:open={imagesDialogOpen}
		onOpenChange={handleImagesDialogClose}
		onImagesUpdate={handleImagesUpdate}
	/>
{/if}

{#if formDialogOpen}
	<ProductFormDialog
		product={selectedProductForEdit}
		bind:open={formDialogOpen}
		onOpenChange={handleFormDialogClose}
		onSuccess={handleFormSuccess}
	/>
{/if}

{#if selectedProductForDelete}
	<ProductDeleteDialog
		product={selectedProductForDelete}
		bind:open={deleteDialogOpen}
		onOpenChange={handleDeleteDialogClose}
		onSuccess={handleDeleteSuccess}
	/>
{/if}
