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
		renderComponent,
		renderSnippet
	} from "$lib/components/ui/data-table/index.js";
	import * as Table from "$lib/components/ui/table/index.js";
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Checkbox } from "$lib/components/ui/checkbox/index.js";
	import DataTableToolbar from "$lib/components/ui/data-table/data-table-toolbar.svelte";
	import { createRawSnippet } from "svelte";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import {
		type AdminVehicleTypeResponse,
		type AdminCreateVehicleTypeRequest,
		type AdminUpdateVehicleTypeRequest
	} from "$lib/api/client";
	import { api } from "$lib/api";
	import { createQuery, createMutation, useQueryClient } from "@tanstack/svelte-query";
	import DataTableColumnHeader from "$lib/components/table/data-table-column-header.svelte";
	import VehicleTypeActions from "$lib/components/dialogs/vehicle-types/vehicle-type-actions.svelte";
	import * as m from "$lib/paraglide/messages";
	import * as Dialog from "$lib/components/ui/dialog";
	import VehicleTypeForm from "$lib/components/dialogs/vehicle-types/vehicle-type-form.svelte";
	import { showErrorToast } from "$lib/utils/toast";

	type VehicleType = AdminVehicleTypeResponse;

	const queryClient = useQueryClient();

	const vehicleTypesQuery = createQuery(() => ({
		queryKey: ["admin", "vehicleTypes"],
		queryFn: async () => {
			const response = await api.marketplace.vehicleTypesGet({});
			return response.map((item) => ({
				id: item.id,
				label: item.label,
				maxWeightKg: item.maxWeightKg,
				maxDistanceKm: item.maxDistanceKm,
				maxLengthCm: item.maxLengthCm,
				maxWidthCm: item.maxWidthCm,
				maxHeightCm: item.maxHeightCm,
				needsDocuments: item.needsDocuments
			}));
		},
		staleTime: 1000 * 60 * 5
	}));

	// Show toast on error
	$effect(() => {
		showErrorToast(vehicleTypesQuery, m["common.error_loading"]());
	});

	const vehicleTypes = $derived(vehicleTypesQuery.data || []);
	const loading = $derived(vehicleTypesQuery.isLoading);

	const createVehicleTypeMutation = createMutation(() => ({
		mutationFn: async (data: AdminCreateVehicleTypeRequest) => {
			return await api.admin.adminVehicleTypesPost({ vehicleType: data });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin", "vehicleTypes"] });
			isDialogOpen = false;
		}
	}));

	let isDialogOpen = $state(false);

	function handleAddSubmit(data: AdminCreateVehicleTypeRequest | AdminUpdateVehicleTypeRequest) {
		if (!data.label) return;
		createVehicleTypeMutation.mutate(data as AdminCreateVehicleTypeRequest);
	}

	function getBooleanBadge(value?: boolean): { text: string; color: string } {
		if (value === true) {
			return { text: m["common.yes"](), color: "bg-green-100 text-green-800" };
		}
		if (value === false) {
			return { text: m["common.no"](), color: "bg-red-100 text-red-800" };
		}
		return { text: m["common.na"](), color: "bg-gray-100 text-gray-800" };
	}

	const columns: ColumnDef<VehicleType>[] = [
		{
			id: "select",
			header: ({ table }) =>
				renderComponent(Checkbox, {
					checked: table.getIsAllPageRowsSelected(),
					indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
					onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
					"aria-label": m["admin_vehicle_types.select_all"]()
				}),
			cell: ({ row }) =>
				renderComponent(Checkbox, {
					checked: row.getIsSelected(),
					onCheckedChange: (value) => row.toggleSelected(!!value),
					"aria-label": m["admin_vehicle_types.select_row"]()
				}),
			enableSorting: false,
			enableHiding: false
		},
		{
			accessorKey: "id",
			header: ({ column }) => {
				return renderComponent(DataTableColumnHeader, {
					column,
					title: "ID"
				});
			},
			cell: ({ row }) => {
				const idSnippet = createRawSnippet<[{ id?: number }]>((getId) => {
					const { id } = getId();
					return {
						render: () =>
							`<div class="font-mono text-sm whitespace-nowrap">${id || m["common.na"]()}</div>`
					};
				});
				return renderSnippet(idSnippet, { id: row.original.id });
			}
		},
		{
			accessorKey: "label",
			header: ({ column }) => {
				return renderComponent(DataTableColumnHeader, {
					column,
					title: m["admin_vehicle_types.table_label"]()
				});
			},
			cell: ({ row }) => {
				const labelSnippet = createRawSnippet<[{ label?: string }]>((getLabel) => {
					const { label } = getLabel();
					return {
						render: () =>
							`<div class="font-medium truncate max-w-xs" title="${label || m["common.na"]()}">${label || m["common.na"]()}</div>`
					};
				});
				return renderSnippet(labelSnippet, { label: row.original.label });
			}
		},
		{
			accessorKey: "maxWeightKg",
			header: ({ column }) => {
				return renderComponent(DataTableColumnHeader, {
					column,
					title: m["admin_vehicle_types.table_weight"]()
				});
			},
			cell: ({ row }) => {
				const weightSnippet = createRawSnippet<[{ weight?: number }]>((getWeight) => {
					const { weight } = getWeight();
					return {
						render: () =>
							`<div class="text-sm whitespace-nowrap">${weight !== undefined ? weight + " kg" : m["common.na"]()}</div>`
					};
				});
				return renderSnippet(weightSnippet, { weight: row.original.maxWeightKg });
			}
		},
		{
			accessorKey: "maxDistanceKm",
			header: ({ column }) => {
				return renderComponent(DataTableColumnHeader, {
					column,
					title: m["admin_vehicle_types.table_distance"]()
				});
			},
			cell: ({ row }) => {
				const distanceSnippet = createRawSnippet<[{ distance?: number }]>((getDistance) => {
					const { distance } = getDistance();
					return {
						render: () =>
							`<div class="text-sm whitespace-nowrap">${distance !== undefined ? distance + " km" : m["common.na"]()}</div>`
					};
				});
				return renderSnippet(distanceSnippet, { distance: row.original.maxDistanceKm });
			}
		},
		{
			id: "dimensions",
			header: ({ column }) => {
				return renderComponent(DataTableColumnHeader, {
					column,
					title: m["admin_vehicle_types.table_dimensions"]()
				});
			},
			cell: ({ row }) => {
				const vehicleType = row.original;
				const dimensionsSnippet = createRawSnippet<[{ vehicleType: VehicleType }]>(
					(getVehicleType) => {
						const { vehicleType } = getVehicleType();
						const { maxLengthCm, maxWidthCm, maxHeightCm } = vehicleType;

						if (
							maxLengthCm !== undefined &&
							maxWidthCm !== undefined &&
							maxHeightCm !== undefined
						) {
							return {
								render: () =>
									`<div class="text-sm font-mono whitespace-nowrap">${maxLengthCm}×${maxWidthCm}×${maxHeightCm} cm</div>`
							};
						}
						return {
							render: () => `<div class="text-sm">${m["common.na"]()}</div>`
						};
					}
				);
				return renderSnippet(dimensionsSnippet, { vehicleType });
			}
		},
		{
			accessorKey: "needsDocuments",
			header: ({ column }) => {
				return renderComponent(DataTableColumnHeader, {
					column,
					title: m["admin_vehicle_types.table_documents"]()
				});
			},
			cell: ({ row }) => {
				const needsDocuments = row.original.needsDocuments;
				const badgeSnippet = createRawSnippet<[{ needsDocuments?: boolean }]>(
					(getNeedsDocuments) => {
						const { needsDocuments } = getNeedsDocuments();
						const badge = getBooleanBadge(needsDocuments);
						return {
							render: () =>
								`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${badge.color}">
                  ${badge.text}
                </span>`
						};
					}
				);
				return renderSnippet(badgeSnippet, { needsDocuments });
			}
		},
		{
			id: "actions",
			cell: ({ row }) => {
				const vehicleType = row.original;
				return renderComponent(VehicleTypeActions, { vehicleType });
			}
		}
	];

	let sorting: SortingState = $state([]);
	let columnFilters: ColumnFiltersState = $state([]);
	let columnVisibility: VisibilityState = $state({});
	let rowSelection: RowSelectionState = $state({});
	let pagination: PaginationState = $state({
		pageIndex: 0,
		pageSize: 10
	});

	const table = createSvelteTable({
		get data() {
			return vehicleTypes;
		},
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
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
		}
	});
</script>

<svelte:head>
	<title>Types de véhicules - Admin</title>
</svelte:head>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">{m["admin_vehicle_types.title"]()}</h1>
			<p class="text-muted-foreground">{m["admin_vehicle_types.description"]()}</p>
		</div>
		<Dialog.Root bind:open={isDialogOpen}>
			<Dialog.Trigger>
				<Button>
					<PlusIcon class="mr-2 h-4 w-4" />
					{m["admin_vehicle_types.add_type"]()}
				</Button>
			</Dialog.Trigger>
			<Dialog.Content class="max-h-[80vh] max-w-lg overflow-y-auto">
				<Dialog.Header>
					<Dialog.Title>{m["admin_vehicle_types.add_dialog_title"]()}</Dialog.Title>
					<Dialog.Description>
						{m["admin_vehicle_types.add_dialog_description"]()}
					</Dialog.Description>
				</Dialog.Header>
				<VehicleTypeForm
					onSubmit={handleAddSubmit}
					submitLabel={createVehicleTypeMutation.isPending
						? m["admin_vehicle_types.creating"]()
						: m["admin_vehicle_types.create"]()}
					isLoading={createVehicleTypeMutation.isPending}
				/>
			</Dialog.Content>
		</Dialog.Root>
	</div>

	<Card.Root>
		<Card.Content>
			{#if loading}
				<div class="flex items-center justify-center py-8">
					<div class="text-muted-foreground">{m["common.loading"]()}</div>
				</div>
			{:else}
				<div>
					<DataTableToolbar
						{table}
						searchColumn="label"
						columnLabels={{
							select: "Sélection",
							label: "Libellé",
							description: "Description",
							maxWeight: "Poids max",
							maxDimensions: "Dimensions max",
							createdAt: "Créé le",
							updatedAt: "Modifié le",
							actions: m["common.actions"]()
						}}
					/>

					<!-- Conteneur avec overflow horizontal pour la table -->
					<div class="overflow-x-auto rounded-md border">
						<Table.Root class="min-w-[900px]">
							<Table.Header>
								{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
									<Table.Row>
										{#each headerGroup.headers as header (header.id)}
											<Table.Head
												colspan={header.colSpan}
												class={header.id === "select"
													? "w-12"
													: header.id === "id"
														? "w-20"
														: header.id === "label"
															? "w-auto min-w-[150px]"
															: header.id === "maxWeightKg"
																? "w-28"
																: header.id === "maxDistanceKm"
																	? "w-32"
																	: header.id === "dimensions"
																		? "w-40"
																		: header.id === "needsDocuments"
																			? "w-36"
																			: header.id === "actions"
																				? "w-20"
																				: ""}
											>
												{#if !header.isPlaceholder}
													<FlexRender
														content={header.column.columnDef.header}
														context={header.getContext()}
													/>
												{/if}
											</Table.Head>
										{/each}
									</Table.Row>
								{/each}
							</Table.Header>
							<Table.Body>
								{#if table.getRowModel().rows?.length}
									{#each table.getRowModel().rows as row (row.id)}
										<Table.Row data-state={row.getIsSelected() && "selected"}>
											{#each row.getVisibleCells() as cell (cell.id)}
												<Table.Cell
													class={cell.column.id === "select"
														? "w-12"
														: cell.column.id === "id"
															? "w-20"
															: cell.column.id === "label"
																? "w-auto min-w-[150px]"
																: cell.column.id === "maxWeightKg"
																	? "w-28"
																	: cell.column.id === "maxDistanceKm"
																		? "w-32"
																		: cell.column.id === "dimensions"
																			? "w-40"
																			: cell.column.id === "needsDocuments"
																				? "w-36"
																				: cell.column.id === "actions"
																					? "w-20"
																					: ""}
												>
													<FlexRender
														content={cell.column.columnDef.cell}
														context={cell.getContext()}
													/>
												</Table.Cell>
											{/each}
										</Table.Row>
									{/each}
								{:else}
									<Table.Row>
										<Table.Cell colspan={columns.length} class="h-24 text-center">
											{m["common.no_data"]()}
										</Table.Cell>
									</Table.Row>
								{/if}
							</Table.Body>
						</Table.Root>
					</div>

					<div class="flex items-center justify-between space-x-2 py-4">
						<div class="flex-1 text-sm text-muted-foreground">
							{m["users.selected_count"]({
								selected: table.getFilteredSelectedRowModel().rows.length,
								total: table.getFilteredRowModel().rows.length
							})}
						</div>
						<div class="space-x-2">
							<Button
								variant="outline"
								size="sm"
								onclick={() => table.previousPage()}
								disabled={!table.getCanPreviousPage()}
							>
								{m["common.previous"]()}
							</Button>
							<Button
								variant="outline"
								size="sm"
								onclick={() => table.nextPage()}
								disabled={!table.getCanNextPage()}
							>
								{m["common.next"]()}
							</Button>
						</div>
					</div>
				</div>
			{/if}
		</Card.Content>
	</Card.Root>
</div>
