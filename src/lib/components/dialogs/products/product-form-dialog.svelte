<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import Label from "$lib/components/ui/label/label.svelte";
	import * as Select from "$lib/components/ui/select";
	import { Textarea } from "$lib/components/ui/textarea";
	import { createMutation, createQuery, useQueryClient } from "@tanstack/svelte-query";
	import { api } from "$lib/api";
	import * as m from "$lib/paraglide/messages";
	import type {
		EntProduct,
		RoutesCreateProductRequest,
		RoutesProductResponse,
		RoutesUpdateProductRequest
	} from "$lib/api/client";
	import LoaderCircle from "@lucide/svelte/icons/loader-circle";
	import { toast } from "svelte-sonner";
	import { parsePrice, formatPriceDisplay, eurosToCents } from "$lib/utils/price";

	interface Props {
		product?: RoutesProductResponse | EntProduct;
		open: boolean;
		onOpenChange: (open: boolean) => void;
		onSuccess: () => void;
	}

	let { product, open = $bindable(), onOpenChange, onSuccess }: Props = $props();

	const queryClient = useQueryClient();
	const isEditing = $derived(!!product?.id);

	let formData = $state<RoutesCreateProductRequest & RoutesUpdateProductRequest>({
		name: "",
		reference: "",
		description: "",
		categoryId: "",
		price: 0,
		stockQuantity: undefined,
		weight: 0,
		width: 0,
		height: 0,
		length: 0,
		status: "active"
	});

	let errors = $state<Record<string, string>>({});
	let priceDisplay = $state<string>("0.00");

	const categoriesQuery = createQuery(() => ({
		queryKey: ["categories"],
		queryFn: async () => {
			try {
				const response = await api.marketplace.categoriesGet();
				return response.categories || [];
			} catch (error) {
				const response = await api.admin.adminCategoriesGet({});
				return response.categories || [];
			}
		},
		staleTime: 1000 * 60 * 30
	}));

	const categories = $derived(categoriesQuery.data || []);

	$effect(() => {
		if (open && product) {
			const price = product.price || 0;
			formData = {
				name: product.name || "",
				reference: product.reference || "",
				description: product.description || "",
				categoryId: product.categoryId || "",
				price: price,
				stockQuantity: product.stockQuantity,
				weight: product.weight || 0,
				width: product.width || 0,
				height: product.height || 0,
				length: product.length || 0,
				status: product.status || "active"
			};
			priceDisplay = formatPriceDisplay(price);
			errors = {};
		} else if (open && !product) {
			formData = {
				name: "",
				reference: "",
				description: "",
				categoryId: "",
				price: 0,
				stockQuantity: undefined,
				weight: 0,
				width: 0,
				height: 0,
				length: 0,
				status: "active"
			};
			priceDisplay = "0.00";
			errors = {};
		}
	});

	$effect(() => {
		if (formData.price !== parsePrice(priceDisplay) * 100) {
			priceDisplay = formatPriceDisplay(formData.price);
		}
	});

	const createProductMutation = createMutation(() => ({
		mutationFn: async () => {
			if (!validateForm()) return;

			const priceInCents = eurosToCents(parsePrice(priceDisplay));

			const createPayload: RoutesCreateProductRequest = {
				name: formData.name!,
				reference: formData.reference!,
				description: formData.description,
				categoryId: formData.categoryId!,
				price: priceInCents,
				...(formData.stockQuantity !== undefined &&
					formData.stockQuantity !== null && { stockQuantity: formData.stockQuantity }),
				weight: formData.weight!,
				width: formData.width!,
				height: formData.height!,
				length: formData.length!,
				status: formData.status
			};

			return await api.vendor.vendorProductsPost({
				product: createPayload
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["vendor", "products"] });
			toast.success(m["products.create_success"]());
			onOpenChange(false);
			onSuccess();
		},
		onError: (error) => {
			toast.error(error instanceof Error ? error.message : String(error));
		}
	}));

	const updateProductMutation = createMutation(() => ({
		mutationFn: async () => {
			if (!product?.id || !validateForm()) return;

			const currentPriceInCents = eurosToCents(parsePrice(priceDisplay));
			const updatePayload: RoutesUpdateProductRequest = {};
			if (formData.name !== product.name) updatePayload.name = formData.name;
			if (formData.reference !== product.reference) updatePayload.reference = formData.reference;
			if (formData.description !== product.description)
				updatePayload.description = formData.description;
			if (formData.categoryId !== product.categoryId)
				updatePayload.categoryId = formData.categoryId;
			if (currentPriceInCents !== product.price) updatePayload.price = currentPriceInCents;
			if (
				formData.stockQuantity !== product.stockQuantity &&
				((formData.stockQuantity !== undefined && formData.stockQuantity !== null) ||
					(product.stockQuantity !== undefined && product.stockQuantity !== null))
			) {
				updatePayload.stockQuantity = formData.stockQuantity;
			}
			if (formData.weight !== product.weight) updatePayload.weight = formData.weight;
			if (formData.width !== product.width) updatePayload.width = formData.width;
			if (formData.height !== product.height) updatePayload.height = formData.height;
			if (formData.length !== product.length) updatePayload.length = formData.length;
			if (formData.status !== product.status) updatePayload.status = formData.status;

			return await api.vendor.vendorProductsIdPut({
				id: product.id,
				product: updatePayload
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["vendor", "products"] });
			queryClient.invalidateQueries({ queryKey: ["vendor", "products", product?.id] });
			toast.success(m["products.update_success"]());
			onOpenChange(false);
			onSuccess();
		},
		onError: (error) => {
			toast.error(error instanceof Error ? error.message : String(error));
		}
	}));

	function validateForm(): boolean {
		errors = {};

		if (!formData.name?.trim()) {
			errors.name = m["products.validation_name_required"]();
		}
		if (!formData.categoryId) {
			errors.categoryId = m["products.validation_category_required"]();
		}
		const parsedPrice = parsePrice(priceDisplay);
		if (!parsedPrice || parsedPrice <= 0) {
			errors.price = m["products.validation_price_required"]();
		}
		if (formData.weight === undefined || formData.weight < 0) {
			errors.weight = m["products.validation_weight_positive"]();
		}
		if (formData.width === undefined || formData.width < 0) {
			errors.width = m["products.validation_width_positive"]();
		}
		if (formData.height === undefined || formData.height < 0) {
			errors.height = m["products.validation_height_positive"]();
		}
		if (formData.length === undefined || formData.length < 0) {
			errors.length = m["products.validation_length_positive"]();
		}

		return Object.keys(errors).length === 0;
	}

	function handleSubmit() {
		if (isEditing) {
			updateProductMutation.mutate();
		} else {
			createProductMutation.mutate();
		}
	}

	function handleCancel() {
		onOpenChange(false);
	}

	const isLoading = $derived(createProductMutation.isPending || updateProductMutation.isPending);
</script>

<Dialog.Root bind:open {onOpenChange}>
	<Dialog.Content class="max-w-2xl">
		<Dialog.Header>
			<Dialog.Title>
				{isEditing ? m["products.edit_product"]() : m["products.add_product"]()}
			</Dialog.Title>
			<Dialog.Description>
				{isEditing ? m["products.edit_description"]() : m["products.add_description"]()}
			</Dialog.Description>
		</Dialog.Header>

		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-2 gap-4">
				<div class="space-y-2">
					<Label for="name">{m["products.product_name"]()} *</Label>
					<Input
						id="name"
						bind:value={formData.name}
						placeholder={m["products.product_name_placeholder"]()}
						class={errors.name ? "border-red-500" : ""}
					/>
					{#if errors.name}
						<p class="text-sm text-red-500">{errors.name}</p>
					{/if}
				</div>

				<div class="space-y-2">
					<Label for="reference">{m["products.reference"]()}</Label>
					<Input
						id="reference"
						bind:value={formData.reference}
						placeholder={m["products.reference_placeholder"]()}
					/>
				</div>
			</div>

			<div class="space-y-2">
				<Label for="description">{m["products.description"]()}</Label>
				<Textarea
					id="description"
					bind:value={formData.description}
					placeholder={m["products.description_placeholder"]()}
					class="h-24"
				/>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div class="space-y-2">
					<Label for="category">{m["products.category"]()} *</Label>
					<Select.Root
						type="single"
						value={formData.categoryId}
						onValueChange={(value: string | undefined) => {
							formData.categoryId = value || "";
						}}
					>
						<Select.Trigger
							id="category"
							class={`w-full ${errors.categoryId ? "border-red-500" : ""}`}
						>
							{categories.find((c) => c.id === formData.categoryId)?.name ||
								m["products.category_placeholder"]()}
						</Select.Trigger>
						<Select.Content>
							{#each categories as category}
								<Select.Item value={category.id || ""}>
									{category.name}
								</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
					{#if errors.categoryId}
						<p class="text-sm text-red-500">{errors.categoryId}</p>
					{/if}
				</div>

				<div class="space-y-2">
					<Label for="status">{m["products.status"]()}</Label>
					<Select.Root
						type="single"
						value={formData.status}
						onValueChange={(value: string | undefined) => {
							formData.status = (value as "active" | "inactive") || "active";
						}}
					>
						<Select.Trigger id="status" class="w-full">
							{formData.status === "active"
								? m["products.status_active"]()
								: m["products.status_inactive"]()}
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="active">{m["products.status_active"]()}</Select.Item>
							<Select.Item value="inactive">{m["products.status_inactive"]()}</Select.Item>
						</Select.Content>
					</Select.Root>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div class="space-y-2">
					<Label for="price">{m["products.price"]()} *</Label>
					<Input
						id="price"
						type="text"
						step="0.01"
						bind:value={priceDisplay}
						placeholder={m["products.price_placeholder"]()}
						class={errors.price ? "border-red-500" : ""}
						oninput={() => {
							formData.price = eurosToCents(parsePrice(priceDisplay));
						}}
					/>
					{#if errors.price}
						<p class="text-sm text-red-500">{errors.price}</p>
					{/if}
				</div>

				<div class="space-y-2">
					<Label for="stockQuantity">{m["products.stock_quantity"]()}</Label>
					<Input
						id="stockQuantity"
						type="number"
						bind:value={formData.stockQuantity}
						placeholder="Non géré (toujours disponible)"
					/>
					<p class="text-xs text-muted-foreground">Laissez vide pour un stock non limité</p>
				</div>
			</div>

			<div class="space-y-2">
				<p class="text-sm font-medium">{m["products.dimensions"]()} *</p>
				<div class="grid grid-cols-4 gap-2">
					<div class="space-y-1">
						<Label for="weight" class="text-xs">{m["products.weight"]()}</Label>
						<Input
							id="weight"
							type="number"
							step="0.01"
							bind:value={formData.weight}
							placeholder="0"
							class={errors.weight ? "border-red-500" : ""}
						/>
						{#if errors.weight}
							<p class="text-xs text-red-500">{errors.weight}</p>
						{/if}
					</div>

					<div class="space-y-1">
						<Label for="width" class="text-xs">{m["products.width"]()}</Label>
						<Input
							id="width"
							type="number"
							step="0.01"
							bind:value={formData.width}
							placeholder="0"
							class={errors.width ? "border-red-500" : ""}
						/>
						{#if errors.width}
							<p class="text-xs text-red-500">{errors.width}</p>
						{/if}
					</div>

					<div class="space-y-1">
						<Label for="height" class="text-xs">{m["products.height"]()}</Label>
						<Input
							id="height"
							type="number"
							step="0.01"
							bind:value={formData.height}
							placeholder="0"
							class={errors.height ? "border-red-500" : ""}
						/>
						{#if errors.height}
							<p class="text-xs text-red-500">{errors.height}</p>
						{/if}
					</div>

					<div class="space-y-1">
						<Label for="length" class="text-xs">{m["products.length"]()}</Label>
						<Input
							id="length"
							type="number"
							step="0.01"
							bind:value={formData.length}
							placeholder="0"
							class={errors.length ? "border-red-500" : ""}
						/>
						{#if errors.length}
							<p class="text-xs text-red-500">{errors.length}</p>
						{/if}
					</div>
				</div>
			</div>
		</div>

		<Dialog.Footer>
			<Button variant="outline" onclick={handleCancel} disabled={isLoading}
				>{m["products.cancel"]()}</Button
			>
			<Button onclick={handleSubmit} disabled={isLoading}>
				{#if isLoading}
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				{isEditing ? m["products.update"]() : m["products.create"]()}
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
