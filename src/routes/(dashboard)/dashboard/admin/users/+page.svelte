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
	import DownloadIcon from "@lucide/svelte/icons/download";
	import FileSpreadsheetIcon from "@lucide/svelte/icons/file-spreadsheet";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import { type AdminAdminUserResponse, type SchemaRole } from "$lib/api/client";
	import { api } from "$lib/api";
	import { createQuery } from "@tanstack/svelte-query";
	import DataTableColumnHeader from "$lib/components/table/data-table-column-header.svelte";
	import * as m from "$lib/paraglide/messages";
	import * as XLSX from "xlsx";
	import { toast } from "svelte-sonner";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

	type User = AdminAdminUserResponse;

	const usersQuery = createQuery(() => ({
		queryKey: ["admin", "users"],
		queryFn: async () => {
			const response = await api.admin.adminUsersGet({
				limit: 100,
				page: 1
			});
			return response.users || [];
		},
		staleTime: 1000 * 60 * 5
	}));

	const users = $derived(usersQuery.data || []);
	const loading = $derived(usersQuery.isLoading);

	// Show toast on error
	$effect(() => {
		if (usersQuery.error) {
			toast.error(m["common.error"]() + ": " + usersQuery.error.message);
		}
	});

	let isExporting = $state(false);
	let exportDropdownOpen = $state(false);

	async function exportUsers(format: "csv" | "excel") {
		if (isExporting) return;

		exportDropdownOpen = false;
		isExporting = true;
		try {
			const response = await api.admin.adminUsersExportGet();
			const csvText = await response.text();

			if (format === "csv") {
				const blob = new Blob([csvText], { type: "text/csv;charset=utf-8;" });
				const url = URL.createObjectURL(blob);
				const link = document.createElement("a");
				link.href = url;
				const timestamp = new Date().toISOString().split("T")[0];
				link.download = `users_${timestamp}.csv`;
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
				XLSX.utils.book_append_sheet(wb, ws, "Users");

				const timestamp = new Date().toISOString().split("T")[0];
				XLSX.writeFile(wb, `users_${timestamp}.xlsx`);
			}
		} catch (error) {
			console.error("Export failed:", error);
		} finally {
			isExporting = false;
		}
	}

	function getRoleColor(role?: SchemaRole): string {
		if (!role) return "bg-gray-100 text-gray-800";
		const roles = {
			admin: "bg-red-100 text-red-800",
			vendor: "bg-blue-100 text-blue-800",
			vendor_employee: "bg-purple-100 text-purple-800",
			courier: "bg-yellow-100 text-yellow-800",
			client: "bg-green-100 text-green-800"
		};
		return roles[role] || "bg-gray-100 text-gray-800";
	}

	function getRoleLabel(role?: SchemaRole): string {
		if (!role) return m["common.unknown"]();
		const labels = {
			admin: m["roles.admin"](),
			vendor: m["roles.vendor"](),
			vendor_employee: m["roles.vendor_employee"](),
			courier: m["roles.courier"](),
			client: m["roles.client"]()
		};
		return labels[role] || m["common.unknown"]();
	}

	function getStatusColor(emailVerified?: boolean, phoneVerified?: boolean): string {
		if (emailVerified && phoneVerified) return "bg-green-100 text-green-800";
		if (emailVerified || phoneVerified) return "bg-yellow-100 text-yellow-800";
		return "bg-red-100 text-red-800";
	}

	function getStatusText(emailVerified?: boolean, phoneVerified?: boolean): string {
		if (emailVerified && phoneVerified) return m["common.verified"]();
		if (emailVerified || phoneVerified) return m["common.partial"]();
		return m["common.unverified"]();
	}

	const columns: ColumnDef<User>[] = [
		{
			id: "select",
			header: ({ table }) =>
				renderComponent(Checkbox, {
					checked: table.getIsAllPageRowsSelected(),
					indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
					onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
					"aria-label": "Select all"
				}),
			cell: ({ row }) =>
				renderComponent(Checkbox, {
					checked: row.getIsSelected(),
					onCheckedChange: (value) => row.toggleSelected(!!value),
					"aria-label": "Select row"
				}),
			enableSorting: false,
			enableHiding: false
		},
		{
			accessorKey: "firstName",
			header: ({ column }) => {
				return renderComponent(DataTableColumnHeader, {
					column,
					title: m["users.name"]()
				});
			},
			cell: ({ row }) => {
				const user = row.original;
				const nameSnippet = createRawSnippet<[{ user: User }]>((getUser) => {
					const { user } = getUser();
					const fullName =
						[user.firstName, user.lastName].filter(Boolean).join(" ") || m["common.na"]();
					return {
						render: () => `<div class="font-medium">${fullName}</div>`
					};
				});
				return renderSnippet(nameSnippet, { user });
			}
		},
		{
			accessorKey: "email",
			header: ({ column }) => {
				return renderComponent(DataTableColumnHeader, {
					column,
					title: m["users.email"]()
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
			accessorKey: "role",
			header: ({ column }) => {
				return renderComponent(DataTableColumnHeader, {
					column,
					title: m["users.role"]()
				});
			},
			cell: ({ row }) => {
				const role = row.original.role;
				const roleSnippet = createRawSnippet<[{ role?: SchemaRole }]>((getRole) => {
					const { role } = getRole();
					const colorClass = getRoleColor(role);
					const displayRole = getRoleLabel(role);
					return {
						render: () =>
							`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}">
                  ${displayRole}
                </span>`
					};
				});
				return renderSnippet(roleSnippet, { role });
			}
		},
		{
			id: "status",
			header: ({ column }) => {
				return renderComponent(DataTableColumnHeader, {
					column,
					title: m["users.verification"]()
				});
			},
			cell: ({ row }) => {
				const user = row.original;
				const statusSnippet = createRawSnippet<[{ user: User }]>((getUser) => {
					const { user } = getUser();
					const colorClass = getStatusColor(user.emailVerified, user.phoneVerified);
					const statusText = getStatusText(user.emailVerified, user.phoneVerified);
					return {
						render: () =>
							`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}">
                  ${statusText}
                </span>`
					};
				});
				return renderSnippet(statusSnippet, { user });
			}
		},
		{
			accessorKey: "createdAt",
			header: ({ column }) => {
				return renderComponent(DataTableColumnHeader, {
					column,
					title: m["users.created_at"]()
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
		}
	];

	let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });
	let sorting = $state<SortingState>([]);
	let columnFilters = $state<ColumnFiltersState>([]);
	let columnVisibility = $state<VisibilityState>({});
	let rowSelection = $state<RowSelectionState>({});

	const table = createSvelteTable({
		get data() {
			return users;
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

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">{m["users.title"]()}</h1>
			<p class="text-muted-foreground">{m["users.manage_users"]()}</p>
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
				<DropdownMenu.Item onclick={() => exportUsers("csv")} disabled={isExporting}>
					<FileTextIcon class="mr-2 h-4 w-4" />
					CSV
				</DropdownMenu.Item>
				<DropdownMenu.Item onclick={() => exportUsers("excel")} disabled={isExporting}>
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
					<div class="text-muted-foreground">{m["users.loading"]()}</div>
				</div>
			{:else}
				<div>
					<DataTableToolbar
						{table}
						searchColumn="email"
						columnLabels={{
							select: "Sélection",
							firstName: m["users.name"](),
							email: m["users.email"](),
							phone: "Téléphone",
							role: m["users.role"](),
							verification: m["users.verification"](),
							createdAt: m["users.created_at"](),
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
											{m["users.no_users"]()}
										</Table.Cell>
									</Table.Row>
								{/each}
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
