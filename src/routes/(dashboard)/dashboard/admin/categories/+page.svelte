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
	import { Plus } from "@lucide/svelte";
	import { createQuery, createMutation, useQueryClient } from "@tanstack/svelte-query";
	import { api } from "$lib/api";
	import * as m from "$lib/paraglide/messages";
	import { toast } from "svelte-sonner";
	import type { AdminCategoryResponse } from "$lib/api/client";
	import DataTableColumnHeader from "$lib/components/table/data-table-column-header.svelte";
	import { showErrorToast } from "$lib/utils/toast";
	import CategoryActions from "$lib/components/dialogs/categories/category-actions.svelte";
	import CategoryFormDialog from "$lib/components/dialogs/categories/category-form-dialog.svelte";
	import DeleteCategoryDialog from "$lib/components/dialogs/categories/delete-category-dialog.svelte";
	import IdCell from "$lib/components/ui/table/cells/id-cell.svelte";
	import NameCell from "$lib/components/ui/table/cells/name-cell.svelte";
	import DateCell from "$lib/components/ui/table/cells/date-cell.svelte";

	type Category = AdminCategoryResponse;

	const queryClient = useQueryClient();

	// Query to fetch categories
	const categoriesQuery = createQuery(() => ({
		queryKey: ["admin", "categories"],
		queryFn: async () => {
			const response = await api.admin.adminCategoriesGet({
				limit: 100,
				page: 1
			});
			return response.categories || [];
		},
		staleTime: 1000 * 60 * 5
	}));

	const categories = $derived(categoriesQuery.data || []);
	const loading = $derived(categoriesQuery.isLoading);

	// Show toast on error
	$effect(() => {
		showErrorToast(categoriesQuery, m["admin.categories.errors.loading_failed"]());
	});

	// Table columns
	const columns: ColumnDef<Category>[] = [
		{
			id: "select",
			header: ({ table }) =>
				renderComponent(Checkbox, {
					checked: table.getIsAllPageRowsSelected(),
					indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
					onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
					"aria-label": m["couriers.select_all"]()
				}),
			cell: ({ row }) =>
				renderComponent(Checkbox, {
					checked: row.getIsSelected(),
					onCheckedChange: (value) => row.toggleSelected(!!value),
					"aria-label": m["couriers.select_row"]()
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
				return renderComponent(IdCell, { id: row.getValue("id") as string });
			}
		},
		{
			accessorKey: "name",
			header: ({ column }) =>
				renderComponent(DataTableColumnHeader, {
					column,
					title: m["admin.categories.table_name"]()
				}),
			cell: ({ row }) => {
				return renderComponent(NameCell, { name: row.getValue("name") as string });
			}
		},
		{
			accessorKey: "createdAt",
			header: ({ column }) =>
				renderComponent(DataTableColumnHeader, {
					column,
					title: m["admin.categories.table_created"]()
				}),
			cell: ({ row }) => {
				return renderComponent(DateCell, { date: row.getValue("createdAt") as string | undefined });
			}
		},
		{
			accessorKey: "updatedAt",
			header: ({ column }) =>
				renderComponent(DataTableColumnHeader, {
					column,
					title: m["admin.categories.table_updated"]()
				}),
			cell: ({ row }) => {
				return renderComponent(DateCell, {
					date: row.getValue("updatedAt") as string | undefined,
					showTime: true
				});
			}
		},
		{
			id: "actions",
			cell: ({ row }) => {
				const category = row.original;
				return renderComponent(CategoryActions, {
					category,
					onEdit: openEditDialog,
					onDelete: openDeleteDialog
				});
			},
			enableSorting: false,
			enableHiding: false
		}
	];

	let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });
	let sorting = $state<SortingState>([]);
	let columnFilters = $state<ColumnFiltersState>([]);
	let columnVisibility = $state<VisibilityState>({});
	let rowSelection = $state<RowSelectionState>({});

	const table = createSvelteTable({
		get data() {
			return categories;
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
				columnFilters = updater;
			}
		},
		onColumnVisibilityChange: (updater) => {
			if (typeof updater === "function") {
				columnVisibility = updater(columnVisibility);
			} else {
				columnVisibility = updater;
			}
		},
		onRowSelectionChange: (updater) => {
			if (typeof updater === "function") {
				rowSelection = updater(rowSelection);
			} else {
				rowSelection = updater;
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

	// Mutation for deleting category
	const deleteCategoryMutation = createMutation(() => ({
		mutationFn: async (id: string) => {
			await api.admin.adminCategoriesIdDelete({ id });
		},
		onSuccess: () => {
			toast.success(m["admin.categories.messages.delete_success"]());
			queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
			closeDeleteDialog();
		},
		onError: () => {
			toast.error(m["admin.categories.messages.delete_error"]());
		}
	}));

	// Dialog states
	let createDialogOpen = $state(false);
	let editDialogOpen = $state(false);
	let deleteDialogOpen = $state(false);

	// Form states
	let editingCategory = $state<Category | null>(null);
	let deleteCategory = $state<Category | null>(null);

	function openCreateDialog() {
		createDialogOpen = true;
	}

	function closeCreateDialog() {
		createDialogOpen = false;
	}

	function openEditDialog(category: Category) {
		editingCategory = category;
		editDialogOpen = true;
	}

	function closeEditDialog() {
		editDialogOpen = false;
		editingCategory = null;
	}

	function openDeleteDialog(category: Category) {
		deleteCategory = category;
		deleteDialogOpen = true;
	}

	function closeDeleteDialog() {
		deleteDialogOpen = false;
		deleteCategory = null;
	}

	function handleDeleteCategory() {
		if (!deleteCategory?.id) return;
		deleteCategoryMutation.mutate(deleteCategory.id);
	}
</script>

<svelte:head>
	<title>{m["admin.categories.title"]()} - Briker</title>
	<meta name="description" content={m["admin.categories.meta_description"]()} />
</svelte:head>

<div class="container mx-auto">
	<div class="mb-6 flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold">{m["admin.categories.title"]()}</h1>
			<p class="text-muted-foreground">{m["admin.categories.description"]()}</p>
		</div>
		<Button onclick={openCreateDialog}>
			<Plus class="mr-2 h-4 w-4" />
			{m["admin.categories.buttons.create"]()}
		</Button>
	</div>

	<Card.Root>
		<Card.Content>
			{#if loading}
				<div class="flex items-center justify-center py-8">
					<div class="text-muted-foreground">{m["admin.categories.loading"]()}</div>
				</div>
			{:else if categories.length === 0}
				<div class="flex flex-col items-center justify-center py-8">
					<div class="mb-4 text-center text-muted-foreground">
						<p class="text-lg font-medium">{m["admin.categories.empty"]()}</p>
						<p class="mt-2 text-sm">Commencez par ajouter votre première catégorie</p>
					</div>
					<Button onclick={openCreateDialog}>
						<Plus class="mr-2 h-4 w-4" />
						{m["admin.categories.buttons.create_first"]()}
					</Button>
				</div>
			{:else}
				<div>
					<DataTableToolbar
						{table}
						searchColumn="name"
						columnLabels={{
							select: "Sélection",
							name: m["admin.categories.table_name"](),
							id: "ID",
							createdAt: m["admin.categories.table_created"](),
							updatedAt: m["admin.categories.table_updated"](),
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
											{m["admin.categories.empty"]()}
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

<!-- Category Form Dialog (Create/Edit) -->
<CategoryFormDialog bind:open={createDialogOpen} onClose={closeCreateDialog} />

<CategoryFormDialog
	bind:open={editDialogOpen}
	category={editingCategory}
	onClose={closeEditDialog}
/>

<!-- Delete Category Dialog -->
<DeleteCategoryDialog
	bind:open={deleteDialogOpen}
	category={deleteCategory}
	onConfirm={handleDeleteCategory}
	onClose={closeDeleteDialog}
/>
