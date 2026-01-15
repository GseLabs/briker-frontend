<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { Checkbox } from "$lib/components/ui/checkbox";
	import PhoneInput from "$lib/components/ui/phone-input/phone-input.svelte";
	import * as m from "$lib/paraglide/messages";
	import { api } from "$lib/api/stores";
	import Label from "$lib/components/ui/label/label.svelte";
	import { Input } from "$lib/components/ui/input";
	import { createForm } from "felte";
	import * as z from "zod";
	import { createZodValidator } from "$lib/utils/createZodValidator";
	import { toast } from "svelte-sonner";

	const vendorRegistrationSchema = z
		.object({
			firstName: z.string().min(2, m["vendor_registration.validation.first_name_required"]()),
			lastName: z.string().min(2, m["vendor_registration.validation.last_name_required"]()),
			email: z.string().email(m["vendor_registration.validation.email_invalid"]()),
			phone: z.string().min(1, m["vendor_registration.validation.phone_required"]()),
			password: z.string().min(8, m["vendor_registration.validation.password_min_length"]()),
			confirmPassword: z
				.string()
				.min(8, m["vendor_registration.validation.confirm_password_required"]()),
			businessName: z.string().min(2, m["vendor_registration.validation.business_name_required"]()),
			siret: z
				.string()
				.length(14, m["vendor_registration.validation.siret_invalid"]())
				.regex(/^\d+$/, { message: m["vendor_registration.validation.siret_digits_only"]() }),
			address: z.string().min(5, m["vendor_registration.validation.address_required"]()),
			city: z.string().min(2, m["vendor_registration.validation.city_required"]()),
			postalCode: z
				.string()
				.regex(/^\d{5}$/, { message: m["vendor_registration.validation.postal_code_invalid"]() }),
			description: z.string().optional(),
			minOrderAmount: z.coerce
				.number()
				.min(0, m["vendor_registration.validation.min_order_amount_invalid"]())
				.optional(),
			preparationTimeMinutes: z.coerce
				.number()
				.min(1, m["vendor_registration.validation.preparation_time_invalid"]())
				.optional(),
			identityCard: z.any().optional(),
			kbis: z.any().optional(),
			insurance: z.any().optional(),
			attestation: z.literal(true, {
				message: m["vendor_registration.validation.attestation_required"]()
			})
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: m["vendor_registration.validation.passwords_mismatch"](),
			path: ["confirmPassword"]
		});

	const { form, errors, isSubmitting, data, reset } = createForm({
		validate: createZodValidator(vendorRegistrationSchema),
		onSubmit: async (values) => {
			try {
				reset();

				await api.vendor.authRegisterVendorPost({
					registration: {
						firstName: values.firstName,
						lastName: values.lastName,
						email: values.email,
						phone: values.phone,
						password: values.password,
						confirmPassword: values.confirmPassword,
						businessName: values.businessName,
						siret: values.siret,
						address: values.address,
						city: values.city,
						postalCode: values.postalCode,
						description: values.description || undefined,
						minOrderAmount: values.minOrderAmount || undefined,
						preparationTimeMinutes: values.preparationTimeMinutes || undefined,
						identityCard: values.identityCard || undefined,
						kbis: values.kbis || undefined,
						insurance: values.insurance || undefined
					}
				});

				toast.success(m["vendor_registration.messages.success"]());
			} catch (error) {
				console.error("Registration failed:", error);
				toast.error(m["vendor_registration.messages.error"]());
			}
		}
	});

	async function fileToBase64(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				const result = reader.result as string;
				const base64 = result.split(",")[1];
				resolve(base64);
			};
			reader.onerror = (error) => reject(error);
		});
	}

	async function handleFileUpload(event: Event, fieldName: string) {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files[0]) {
			const file = target.files[0];
			const maxSize = 10 * 1024 * 1024;
			const allowedTypes = [
				"image/jpeg",
				"image/jpg",
				"image/png",
				"image/webp",
				"application/pdf"
			];

			if (file.size > maxSize) {
				target.value = "";
				toast.error(
					m["vendor_registration.validation.file_too_large"]().replace("{filename}", file.name)
				);
				return;
			}

			if (!allowedTypes.includes(file.type)) {
				target.value = "";
				toast.error(
					m["vendor_registration.messages.file_format_invalid"]({
						filename: file.name
					})
				);
				return;
			}

			try {
				const base64 = await fileToBase64(file);
				($data as Record<string, any>)[fieldName] = base64;
				console.log(`File uploaded and encoded for ${fieldName}:`, file.name);
			} catch (error) {
				console.error(`Error encoding file ${fieldName}:`, error);
				target.value = "";
				toast.error(m["vendor_registration.messages.error"]());
			}
		}
	}
</script>

<svelte:head>
	<title>{m["vendor_registration.title"]()}</title>
	<meta name="description" content={m["vendor_registration.meta_description"]()} />
</svelte:head>

<div class="min-h-screen bg-background py-20">
	<div class="container mx-auto max-w-4xl px-4">
		<div class="mb-12 text-center">
			<h1 class="mb-6 text-3xl font-bold text-foreground lg:text-4xl">
				{m["vendor_registration.main_title"]()}
			</h1>
			<p class="mx-auto max-w-3xl text-lg text-muted-foreground">
				{m["vendor_registration.subtitle"]()}
			</p>
		</div>

		<Card.Root>
			<Card.Header>
				<Card.Title class="text-2xl">{m["vendor_registration.form_title"]()}</Card.Title>
				<Card.Description>
					{m["vendor_registration.form_description"]()}
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<form method="POST" use:form>
					<div class="grid gap-6 md:grid-cols-2">
						<div>
							<Label class="mb-2 block text-sm font-medium">
								{m["vendor_registration.labels.first_name"]()}
							</Label>
							<Input
								name="firstName"
								type="text"
								placeholder={m["vendor_registration.placeholders.first_name"]()}
								disabled={$isSubmitting}
							/>
							{#if $errors.firstName}
								<p class="mt-1 text-sm text-destructive">{$errors.firstName}</p>
							{/if}
						</div>

						<div>
							<Label class="mb-2 block text-sm font-medium">
								{m["vendor_registration.labels.last_name"]()}
							</Label>
							<Input
								type="text"
								name="lastName"
								placeholder={m["vendor_registration.placeholders.last_name"]()}
								disabled={$isSubmitting}
							/>
							{#if $errors.lastName}
								<p class="mt-1 text-sm text-destructive">{$errors.lastName}</p>
							{/if}
						</div>

						<div>
							<Label class="mb-2 block text-sm font-medium">
								{m["vendor_registration.labels.email"]()}
							</Label>
							<Input
								type="email"
								name="email"
								placeholder={m["vendor_registration.placeholders.email"]()}
								disabled={$isSubmitting}
							/>
							{#if $errors.email}
								<p class="mt-1 text-sm text-destructive">{$errors.email}</p>
							{/if}
						</div>

						<div>
							<Label class="mb-2 block text-sm font-medium">
								{m["vendor_registration.labels.phone"]()}
							</Label>
							<PhoneInput
								defaultCountry="FR"
								name="phone"
								placeholder={m["vendor_registration.placeholders.phone"]()}
							/>
							{#if $errors.phone}
								<p class="mt-1 text-sm text-destructive">{$errors.phone}</p>
							{/if}
						</div>

						<div>
							<Label class="mb-2 block text-sm font-medium">
								{m["vendor_registration.labels.password"]()}
							</Label>
							<Input
								type="password"
								name="password"
								placeholder={m["vendor_registration.placeholders.password"]()}
								disabled={$isSubmitting}
							/>
							{#if $errors.password}
								<p class="mt-1 text-sm text-destructive">{$errors.password}</p>
							{/if}
						</div>

						<div>
							<Label class="mb-2 block text-sm font-medium">
								{m["vendor_registration.labels.confirm_password"]()}
							</Label>
							<Input
								type="password"
								name="confirmPassword"
								placeholder={m["vendor_registration.placeholders.confirm_password"]()}
								disabled={$isSubmitting}
							/>
							{#if $errors.confirmPassword}
								<p class="mt-1 text-sm text-destructive">{$errors.confirmPassword}</p>
							{/if}
						</div>
					</div>

					<div class="mt-6 border-t border-border pt-6">
						<h3 class="mb-4 text-lg font-semibold">
							{m["vendor_registration.sections.business_info"]()}
						</h3>
						<div class="grid gap-6 md:grid-cols-2">
							<div>
								<Label class="mb-2 block text-sm font-medium">
									{m["vendor_registration.labels.business_name"]()}
								</Label>
								<Input
									type="text"
									name="businessName"
									placeholder={m["vendor_registration.placeholders.business_name"]()}
									disabled={$isSubmitting}
								/>
								{#if $errors.businessName}
									<p class="mt-1 text-sm text-destructive">{$errors.businessName}</p>
								{/if}
							</div>

							<div>
								<Label class="mb-2 block text-sm font-medium">
									{m["vendor_registration.labels.siret"]()}
								</Label>
								<Input
									type="text"
									name="siret"
									placeholder={m["vendor_registration.placeholders.siret"]()}
									maxlength={14}
									disabled={$isSubmitting}
								/>
								{#if $errors.siret}
									<p class="mt-1 text-sm text-destructive">{$errors.siret}</p>
								{/if}
							</div>

							<div>
								<Label class="mb-2 block text-sm font-medium">
									{m["vendor_registration.labels.address"]()}
								</Label>
								<Input
									type="text"
									name="address"
									placeholder={m["vendor_registration.placeholders.address"]()}
									disabled={$isSubmitting}
								/>
								{#if $errors.address}
									<p class="mt-1 text-sm text-destructive">{$errors.address}</p>
								{/if}
							</div>

							<div>
								<Label class="mb-2 block text-sm font-medium">
									{m["vendor_registration.labels.city"]()}
								</Label>
								<Input
									type="text"
									name="city"
									placeholder={m["vendor_registration.placeholders.city"]()}
									disabled={$isSubmitting}
								/>
								{#if $errors.city}
									<p class="mt-1 text-sm text-destructive">{$errors.city}</p>
								{/if}
							</div>

							<div>
								<Label class="mb-2 block text-sm font-medium">
									{m["vendor_registration.labels.postal_code"]()}
								</Label>
								<Input
									type="text"
									name="postalCode"
									placeholder={m["vendor_registration.placeholders.postal_code"]()}
									maxlength={5}
									disabled={$isSubmitting}
								/>
								{#if $errors.postalCode}
									<p class="mt-1 text-sm text-destructive">{$errors.postalCode}</p>
								{/if}
							</div>

							<div>
								<Label class="mb-2 block text-sm font-medium">
									{m["vendor_registration.labels.description"]()}
								</Label>
								<Input
									type="text"
									name="description"
									placeholder={m["vendor_registration.placeholders.description"]()}
									disabled={$isSubmitting}
								/>
								{#if $errors.description}
									<p class="mt-1 text-sm text-destructive">{$errors.description}</p>
								{/if}
							</div>

							<div>
								<Label class="mb-2 block text-sm font-medium">
									{m["vendor_registration.labels.min_order_amount"]()}
								</Label>
								<Input
									type="number"
									name="minOrderAmount"
									placeholder={m["vendor_registration.placeholders.min_order_amount"]()}
									min="0"
									step="0.01"
									disabled={$isSubmitting}
								/>
								{#if $errors.minOrderAmount}
									<p class="mt-1 text-sm text-destructive">{$errors.minOrderAmount}</p>
								{/if}
							</div>

							<div>
								<Label class="mb-2 block text-sm font-medium">
									{m["vendor_registration.labels.preparation_time"]()}
								</Label>
								<Input
									type="number"
									name="preparationTimeMinutes"
									placeholder={m["vendor_registration.placeholders.preparation_time"]()}
									min="1"
									disabled={$isSubmitting}
								/>
								{#if $errors.preparationTimeMinutes}
									<p class="mt-1 text-sm text-destructive">{$errors.preparationTimeMinutes}</p>
								{/if}
							</div>
						</div>

						<div class="mt-6 space-y-6">
							<h3 class="text-lg font-semibold">
								{m["vendor_registration.sections.documents"]()}
							</h3>

							<div class="grid gap-6 md:grid-cols-2">
								<div>
									<Label class="mb-2 block text-sm font-medium" for="identityCard">
										{m["vendor_registration.labels.identity_card"]()}
									</Label>
									<Input
										name="identityCard"
										type="file"
										accept="image/*,.pdf"
										onchange={(e) => handleFileUpload(e, "identityCard")}
										disabled={$isSubmitting}
									/>
									{#if $errors.identityCard}
										<p class="mt-1 text-sm text-destructive">{$errors.identityCard}</p>
									{/if}
								</div>

								<div>
									<Label class="mb-2 block text-sm font-medium" for="kbis">
										{m["vendor_registration.labels.kbis"]()}
									</Label>
									<Input
										name="kbis"
										type="file"
										accept="image/*,.pdf"
										onchange={(e) => handleFileUpload(e, "kbis")}
										disabled={$isSubmitting}
									/>
									{#if $errors.kbis}
										<p class="mt-1 text-sm text-destructive">{$errors.kbis}</p>
									{/if}
								</div>

								<div>
									<Label class="mb-2 block text-sm font-medium" for="insurance">
										{m["vendor_registration.labels.insurance"]()}
									</Label>
									<Input
										name="insurance"
										type="file"
										accept="image/*,.pdf"
										onchange={(e) => handleFileUpload(e, "insurance")}
										disabled={$isSubmitting}
									/>
									{#if $errors.insurance}
										<p class="mt-1 text-sm text-destructive">{$errors.insurance}</p>
									{/if}
								</div>
							</div>
						</div>

						<div class="mt-6">
							<label class="flex items-center space-x-2">
								<Checkbox
									name="attestation"
									checked={$data.attestation}
									onCheckedChange={(b) => ($data.attestation = b)}
								/>
								<span class="text-sm">
									{m["vendor_registration.attestation_text"]()}
								</span>
							</label>
							{#if $errors.attestation}
								<p class="mt-1 text-sm text-destructive">{$errors.attestation}</p>
							{/if}
						</div>

						<div class="mt-6 flex justify-end">
							<Button type="submit" disabled={$isSubmitting}>
								{$isSubmitting
									? m["vendor_registration.submitting"]()
									: m["vendor_registration.submit_button"]()}
							</Button>
						</div>
					</div>
				</form>
			</Card.Content>
		</Card.Root>
	</div>
</div>
