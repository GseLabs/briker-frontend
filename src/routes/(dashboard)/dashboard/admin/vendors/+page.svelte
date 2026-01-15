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
	import DownloadIcon from "@lucide/svelte/icons/download";
	import FileSpreadsheetIcon from "@lucide/svelte/icons/file-spreadsheet";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import { type AdminAdminVendorResponse, type VendorprofileStatus } from "$lib/api/client";
	import { api } from "$lib/api";
	import { createQuery } from "@tanstack/svelte-query";
	import DataTableColumnHeader from "$lib/components/table/data-table-column-header.svelte";
	import * as m from "$lib/paraglide/messages";
	import * as XLSX from "xlsx";
	import VendorActions from "$lib/components/dialogs/vendors/vendor-actions.svelte";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { showErrorToast } from "$lib/utils/toast";

	type Vendor = AdminAdminVendorResponse;

	const vendorsQuery = createQuery(() => ({
		queryKey: ["admin", "vendors"],
		queryFn: async () => {
			const response = await api.admin.adminVendorsGet({
				limit: 100,
				page: 1
			});
			return response.vendors || [];
		},
		staleTime: 1000 * 60 * 5
	}));

	// Show toast on error
	$effect(() => {
		showErrorToast(vendorsQuery, m["common.error_loading"]());
	});

	const vendors = $derived(vendorsQuery.data || []);
	const loading = $derived(vendorsQuery.isLoading);

	let isExporting = $state(false);
	let exportDropdownOpen = $state(false);

	async function exportVendors(format: "csv" | "excel") {
		if (isExporting) return;

		exportDropdownOpen = false;
		isExporting = true;
		try {
			const response = await api.admin.adminUsersExportGet({
				role: "vendor"
			});
			const csvText = await response.text();

			if (format === "csv") {
				const blob = new Blob([csvText], { type: "text/csv;charset=utf-8;" });
				const url = URL.createObjectURL(blob);
				const link = document.createElement("a");
				link.href = url;
				const timestamp = new Date().toISOString().split("T")[0];
				link.download = `vendors_${timestamp}.csv`;
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				URL.revokeObjectURL(url);
			} else {
				const lines = csvText.split("\n").filter((line) => line.trim());
				const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""));
				const data = lines.slice(1).map((line) => {
					const values = line.split(",").map((v) => v.trim().replace(/"/g, ""));
					return headers.reduce(
						(obj, header, index) => {
							obj[header] = values[index] || "";
							return obj;
						},
						{} as Record<string, string>
					);
				});

				const ws = XLSX.utils.json_to_sheet(data);
				const wb = XLSX.utils.book_new();
				XLSX.utils.book_append_sheet(wb, ws, "Vendors");

				const timestamp = new Date().toISOString().split("T")[0];
				XLSX.writeFile(wb, `vendors_${timestamp}.xlsx`);
			}
		} catch (error) {
			console.error("Export failed:", error);
		} finally {
			isExporting = false;
		}
	}

	function getStatusColor(status?: VendorprofileStatus): string {
		const colors = {
			pending_approval: "bg-yellow-100 text-yellow-800",
			approved: "bg-green-100 text-green-800",
			active: "bg-blue-100 text-blue-800",
			rejected: "bg-red-100 text-red-800",
			suspended: "bg-orange-100 text-orange-800",
			banned: "bg-gray-100 text-gray-800"
		};
		if (status && typeof status === "string" && status in colors) {
			return colors[status as keyof typeof colors];
		}
		return "bg-gray-100 text-gray-800";
	}

	function getStatusLabel(status?: VendorprofileStatus): string {
		const labels = {
			pending_approval: m["vendors.pending_approval"]?.() || "En attente d'approbation",
			approved: m["vendors.approved"]?.() || "Approuvé",
			active: m["vendors.active"]?.() || "Actif",
			rejected: m["vendors.rejected"]?.() || "Rejeté",
			suspended: m["vendors.suspended"]?.() || "Suspendu",
			banned: m["vendors.banned"]?.() || "Banni"
		};
		if (typeof status === "string" && status in labels) {
			return labels[status as keyof typeof labels];
		}
		return m["common.unknown"]();
	}

	function getVerificationColor(emailVerified?: boolean, phoneVerified?: boolean): string {
		if (emailVerified && phoneVerified) return "bg-green-100 text-green-800";
		if (emailVerified || phoneVerified) return "bg-yellow-100 text-yellow-800";
		return "bg-red-100 text-red-800";
	}

	function getVerificationText(emailVerified?: boolean, phoneVerified?: boolean): string {
		if (emailVerified && phoneVerified) return m["common.verified"]();
		if (emailVerified || phoneVerified) return m["common.partial"]();
		return m["common.unverified"]();
	}

	const columns: ColumnDef<Vendor>[] = [
		{
			id: "select",
			header: ({ table }) =>
				renderComponent(Checkbox, {
					checked: table.getIsAllPageRowsSelected(),
					indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
					onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
					"aria-label": m["vendors.select_all"]?.() || "Sélectionner tout"
				}),
			cell: ({ row }) =>
				renderComponent(Checkbox, {
					checked: row.getIsSelected(),
					onCheckedChange: (value) => row.toggleSelected(!!value),
					"aria-label": m["vendors.select_row"]?.() || "Sélectionner la ligne"
				}),
			enableSorting: false,
			enableHiding: false
		},
		{
			accessorKey: "firstName",
			header: ({ column }) => {
				return renderComponent(DataTableColumnHeader, {
					column,
					title: m["vendors.name"]?.() || "Nom"
				});
			},
			cell: ({ row }) => {
				const vendor = row.original;
				const nameSnippet = createRawSnippet<[{ vendor: Vendor }]>((getVendor) => {
					const { vendor } = getVendor();
					const fullName =
						[vendor.firstName, vendor.lastName].filter(Boolean).join(" ") || m["common.na"]();
					return {
						render: () => `<div class="font-medium">${fullName}</div>`
					};
				});
				return renderSnippet(nameSnippet, { vendor });
			}
		},
		{
			accessorKey: "email",
			header: ({ column }) => {
				return renderComponent(DataTableColumnHeader, {
					column,
					title: m["vendors.email"]?.() || "Email"
				});
			},
			cell: ({ row }) => {
				const emailSnippet = createRawSnippet<[{ email: string | undefined }]>((getEmail) => {
					const { email } = getEmail();
					return {
						render: () => `<div class="lowercase">${email ?? m["common.na"]()}</div>`
					};
				});

				return renderSnippet(emailSnippet, {
					email: row.original.email
				});
			}
		},
		{
			accessorKey: "phone",
			header: ({ column }) => {
				return renderComponent(DataTableColumnHeader, {
					column,
					title: m["vendors.phone"]?.() || "Téléphone"
				});
			},
			cell: ({ row }) => {
				const phoneSnippet = createRawSnippet<[{ phone: string | undefined }]>((getPhone) => {
					const { phone } = getPhone();
					return {
						render: () => `<div class="text-sm">${phone ?? m["common.na"]()}</div>`
					};
				});

				return renderSnippet(phoneSnippet, {
					phone: row.original.phone
				});
			}
		},
		{
			accessorKey: "status",
			header: ({ column }) => {
				return renderComponent(DataTableColumnHeader, {
					column,
					title: m["vendors.status"]?.() || "Statut"
				});
			},
			cell: ({ row }) => {
				const status = row.original.status;
				const statusSnippet = createRawSnippet<[{ status?: VendorprofileStatus }]>((getStatus) => {
					const { status } = getStatus();
					const colorClass = getStatusColor(status);
					const displayStatus = getStatusLabel(status);
					return {
						render: () =>
							`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}">
                  ${displayStatus}
                </span>`
					};
				});
				return renderSnippet(statusSnippet, { status });
			}
		},
		{
			id: "verification",
			header: ({ column }) => {
				return renderComponent(DataTableColumnHeader, {
					column,
					title: m["vendors.verification"]?.() || "Vérification"
				});
			},
			cell: ({ row }) => {
				const vendor = row.original;
				const verificationSnippet = createRawSnippet<[{ vendor: Vendor }]>((getVendor) => {
					const { vendor } = getVendor();
					const colorClass = getVerificationColor(vendor.emailVerified, vendor.phoneVerified);
					const verificationText = getVerificationText(vendor.emailVerified, vendor.phoneVerified);
					return {
						render: () =>
							`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}">
                  ${verificationText}
                </span>`
					};
				});
				return renderSnippet(verificationSnippet, { vendor });
			}
		},
		{
			accessorKey: "createdAt",
			header: ({ column }) => {
				return renderComponent(DataTableColumnHeader, {
					column,
					title: m["vendors.created_at"]?.() || "Créé le"
				});
			},
			cell: ({ row }) => {
				const createdAt = row.original.createdAt;
				const dateSnippet = createRawSnippet<[{ createdAt?: string }]>((getDate) => {
					const { createdAt } = getDate();
					if (!createdAt)
						return { render: () => `<div class="text-sm text-gray-500">${m["common.na"]()}</div>` };
					const formatted = new Intl.DateTimeFormat("en-US", {
						year: "numeric",
						month: "short",
						day: "numeric"
					}).format(new Date(createdAt));
					return {
						render: () => `<div class="text-sm text-gray-500">${formatted}</div>`
					};
				});
				return renderSnippet(dateSnippet, { createdAt });
			}
		},
		{
			id: "actions",
			cell: ({ row }) => {
				const vendor = row.original;
				return renderComponent(VendorActions, { vendor });
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
			return vendors;
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
</script>

<svelte:head>
	<title>{m["vendors.title"]?.() || "Fournisseurs"} - Admin</title>
	<meta
		name="description"
		content={m["vendors.manage_vendors"]?.() || "Gérez vos fournisseurs et leurs permissions"}
	/>
</svelte:head>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">{m["vendors.title"]?.() || "Fournisseurs"}</h1>
			<p class="text-muted-foreground">
				{m["vendors.manage_vendors"]?.() || "Gérez vos fournisseurs et leurs permissions"}
			</p>
		</div>
		<DropdownMenu.Root bind:open={exportDropdownOpen}>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button {...props} disabled={isExporting}>
						{#if isExporting}
							<div
								class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"
							></div>
						{:else}
							<DownloadIcon class="mr-2 h-4 w-4" />
						{/if}
						{isExporting ? m["common.loading"]() : m["common.export"]()}
					</Button>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Item onclick={() => exportVendors("csv")} disabled={isExporting}>
					<FileTextIcon class="mr-2 h-4 w-4" />
					CSV
				</DropdownMenu.Item>
				<DropdownMenu.Item onclick={() => exportVendors("excel")} disabled={isExporting}>
					<FileSpreadsheetIcon class="mr-2 h-4 w-4" />
					Excel
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
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
						searchColumn="email"
						columnLabels={{
							select: m["vendors.select_all"](),
							firstName: m["vendors.name"](),
							email: m["vendors.email"](),
							phone: m["vendors.phone"](),
							status: m["vendors.status"](),
							verification: m["vendors.verification"](),
							createdAt: m["vendors.created_at"](),
							actions: m["common.actions"]()
						}}
					/>
					<div class="rounded-md border">
						<Table.Root>
							<Table.Header>
								{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
									<Table.Row>
										{#each headerGroup.headers as header (header.id)}
											<Table.Head colspan={header.colSpan}>
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
								{#each table.getRowModel().rows as row (row.id)}
									<Table.Row data-state={row.getIsSelected() && "selected"}>
										{#each row.getVisibleCells() as cell (cell.id)}
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
											{m["vendors.no_vendors"]?.() || "Aucun fournisseur trouvé"}
										</Table.Cell>
									</Table.Row>
								{/each}
							</Table.Body>
						</Table.Root>
					</div>
					<div class="flex items-center justify-between space-x-2 py-4">
						<div class="flex-1 text-sm text-muted-foreground">
							{m["vendors.selected_count"]?.({
								selected: table.getFilteredSelectedRowModel().rows.length,
								total: table.getFilteredRowModel().rows.length
							}) || "{selected} sur {total} ligne(s) sélectionnée(s)."}
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
