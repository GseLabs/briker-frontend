<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import { Button } from "$lib/components/ui/button";
	import { X, Upload, Trash2, Image as ImageIcon } from "@lucide/svelte";
	import { api } from "$lib/api";
	import { toast } from "svelte-sonner";
	import { createQuery, useQueryClient } from "@tanstack/svelte-query";
	import type { EntProduct, RoutesProductResponse } from "$lib/api/client";
	import { fileToBase64 } from "$lib/utils/file";
	import * as m from "$lib/paraglide/messages";
	import Label from "$lib/components/ui/label/label.svelte";

	interface Props {
		product: RoutesProductResponse | EntProduct;
		open: boolean;
		onOpenChange: (open: boolean) => void;
		onImagesUpdate: () => void;
	}

	let { product, open = $bindable(), onOpenChange, onImagesUpdate }: Props = $props();

	const queryClient = useQueryClient();

	// Query for product data (includes images)
	const productQuery = createQuery(() => ({
		queryKey: ["vendor", "products", product.id],
		queryFn: async () => {
			const response = await api.vendor.vendorProductsIdGet({
				id: product.id as string
			});
			return response;
		},
		staleTime: 1000 * 60 * 5
	}));

	const images = $derived(productQuery.data?.productImages || product.productImages || []);

	let uploading = $state(false);
	let deleting = $state<number | null>(null);
	let fileInput: HTMLInputElement;

	async function handleImageUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		const files = target.files;

		if (!files || files.length === 0) return;

		uploading = true;

		try {
			for (const file of files) {
				const base64Data = await fileToBase64(file);

				await api.vendor.vendorProductsIdImagesPost({
					id: product.id as string,
					image: {
						base64Data,
						filename: file.name
					}
				});
			}

			toast.success(m["product_images.upload_success"]({ count: files.length.toString() }));
			queryClient.invalidateQueries({ queryKey: ["vendor", "products", product.id] });
			onImagesUpdate();
		} catch (error) {
			toast.error(m["product_images.upload_error"]());
			console.error("Upload error:", error);
		} finally {
			uploading = false;
			target.value = "";
		}
	}

	async function handleImageDelete(imageIndex: number) {
		deleting = imageIndex;

		try {
			await api.vendor.vendorProductsIdImagesIndexDelete({
				id: product.id as string,
				index: imageIndex.toString()
			});

			toast.success(m["product_images.delete_success"]());
			queryClient.invalidateQueries({ queryKey: ["vendor", "products", product.id] });
			onImagesUpdate();
		} catch (error) {
			toast.error(m["product_images.delete_error"]());
			console.error("Delete error:", error);
		} finally {
			deleting = null;
		}
	}
</script>

<Dialog.Root bind:open {onOpenChange}>
	<Dialog.Content class="sm:max-w-2xl">
		<Dialog.Header>
			<Dialog.Title>{m["product_images.dialog_title"]()}</Dialog.Title>
			<Dialog.Description>
				{m["product_images.dialog_description"]({ name: product.name || "" })}
			</Dialog.Description>
		</Dialog.Header>

		<div class="space-y-6">
			<!-- Upload Section -->
			<div>
				<Label class="mb-3 block text-sm font-medium"
					>{m["product_images.upload_section_label"]()}</Label
				>
				<input
					bind:this={fileInput}
					type="file"
					multiple
					accept="image/*"
					onchange={handleImageUpload}
					disabled={uploading}
					class="hidden"
				/>
				<Button
					onclick={() => fileInput?.click()}
					disabled={uploading}
					class="w-full"
					variant="outline"
				>
					<Upload class="mr-2 h-4 w-4" />
					{uploading ? m["product_images.uploading"]() : m["product_images.choose_images"]()}
				</Button>
			</div>

			<!-- Current Images -->
			{#if productQuery.isLoading}
				<div class="py-8 text-center">
					<div
						class="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"
					></div>
					<p class="mt-2 text-sm text-muted-foreground">{m["product_images.loading_images"]()}</p>
				</div>
			{:else if images && images.length > 0}
				<div>
					<Label class="mb-3 block text-sm font-medium"
						>{m["product_images.current_images_label"]({ count: images.length.toString() })}</Label
					>
					<div class="grid grid-cols-2 gap-4 md:grid-cols-3">
						{#each images as imagePath, index}
							<div class="group relative overflow-hidden rounded-lg border bg-muted">
								<img
									src={imagePath}
									alt={m["product_images.image_alt"]({ index: (index + 1).toString() })}
									class="h-32 w-full object-cover"
									onerror={(e) => {
										console.error("Image failed to load:", imagePath, imagePath);
										const target = e.target as HTMLImageElement;
										target.src =
											"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDIwMCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04MCA2NEwxMDAgODRMMTIwIDY0TDE0MCA4NEwxNjAgNjQiIHN0cm9rZT0iIzk0QTNPIiBzdHJva2Utd2lkdGg9IjIiLz4KPGNpcmNsZSBjeD0iODAiIGN5PSI0OCIgcj0iOCIgZmlsbD0iIzlBM0E5Ii8+Cjx0ZXh0IHg9IjgwIiB5PSIxMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2Qjc1OEYiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCI+SW1hZ2UgRXJyb3I8L3RleHQ+Cjwvc3ZnPg==";
									}}
								/>
								<div
									class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
								>
									<Button
										size="sm"
										variant="destructive"
										onclick={() => handleImageDelete(index)}
										disabled={deleting === index}
									>
										{#if deleting === index}
											<div
												class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
											></div>
										{:else}
											<Trash2 class="h-4 w-4" />
										{/if}
									</Button>
								</div>
								<div
									class="absolute top-2 right-2 rounded bg-black/50 px-2 py-1 text-xs text-white"
								>
									{index + 1}
								</div>
								<div
									class="absolute bottom-2 left-2 max-w-[100px] truncate rounded bg-black/50 px-2 py-1 text-xs text-white"
									title={imagePath}
								>
									{imagePath.split("/").pop() || "Image"}
								</div>
							</div>
						{/each}
					</div>
				</div>
			{:else}
				<div class="rounded-lg border-2 border-dashed border-muted-foreground/25 py-8 text-center">
					<ImageIcon class="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
					<p class="mb-2 text-sm text-muted-foreground">{m["product_images.no_images_title"]()}</p>
					<p class="text-xs text-muted-foreground">{m["product_images.no_images_description"]()}</p>
				</div>
			{/if}
		</div>

		<Dialog.Footer>
			<Button variant="outline" onclick={() => onOpenChange(false)}>
				{m["product_images.done"]()}
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
