import * as m from "$lib/paraglide/messages";
import type { Component } from "svelte";
import LayoutDashboard from "@lucide/svelte/icons/layout-dashboard";

import ShoppingCart from "@lucide/svelte/icons/shopping-cart";
import Users from "@lucide/svelte/icons/users";
import Store from "@lucide/svelte/icons/store";
import List from "@lucide/svelte/icons/list";
import Settings from "@lucide/svelte/icons/settings";
import Car from "@lucide/svelte/icons/car";
import Tag from "@lucide/svelte/icons/tag";
import Package from "@lucide/svelte/icons/package";
import DollarSign from "@lucide/svelte/icons/dollar-sign";

export interface SidebarItem {
	label: () => string;
	href?: string;
	icon: Component;
	children?: SidebarItem[];
}

export const sidebarConfig: Record<string, SidebarItem[]> = {
	admin: [
		{ label: () => m["sidebar.dashboard"](), href: "/dashboard", icon: LayoutDashboard },
		{
			label: () => m["sidebar.users"](),
			icon: Users,
			children: [
				{ label: () => m["sidebar.all_users"](), href: "/dashboard/admin/users", icon: List },
				{ label: () => m["sidebar.clients"](), href: "/dashboard/admin/clients", icon: Users },
				{ label: () => m["sidebar.vendors"](), href: "/dashboard/admin/vendors", icon: Store },
				{
					label: () => m["sidebar.couriers"](),
					href: "/dashboard/admin/couriers",
					icon: ShoppingCart
				}
			]
		},
		{
			label: () => m["sidebar.settings"](),
			icon: Settings,
			children: [
				{
					label: () => m["sidebar.categories"](),
					href: "/dashboard/admin/categories",
					icon: Tag
				},
				{
					label: () => m["sidebar.vehicle_types"](),
					href: "/dashboard/admin/vehicle-types",
					icon: Car
				},
				{
					label: () => m["sidebar.delivery_fees"](),
					href: "/dashboard/admin/delivery-fees",
					icon: DollarSign
				}
			]
		}
	],
	vendor: [
		{ label: () => m["sidebar.dashboard"](), href: "/dashboard", icon: LayoutDashboard },
		{
			label: () => m["sidebar.products"](),
			href: "/dashboard/vendor/products",
			icon: Package
		},
		{
			label: () => m["sidebar.orders"](),
			href: "/dashboard/vendor/orders",
			icon: ShoppingCart
		}
	]
};
