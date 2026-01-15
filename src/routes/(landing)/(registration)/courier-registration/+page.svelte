<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import * as Select from "$lib/components/ui/select";
	import { Checkbox } from "$lib/components/ui/checkbox";
	import PhoneInput from "$lib/components/ui/phone-input/phone-input.svelte";
	import * as m from "$lib/paraglide/messages";
	import { api } from "$lib/api/stores";
	import type { RoutesPublicVehicleTypeResponse } from "$lib/api/client";
	import Label from "$lib/components/ui/label/label.svelte";
	import { Input } from "$lib/components/ui/input";
	import { createForm } from "felte";
	import * as z from "zod";
	import { createZodValidator } from "$lib/utils/createZodValidator";
	import { toast } from "svelte-sonner";

	let vehicleTypes = $state<RoutesPublicVehicleTypeResponse[]>([]);
	let vehicleTypesLoading = $state(false);

	async function loadVehicleTypes() {
		vehicleTypesLoading = true;
		try {
			const response = await api.marketplace.vehicleTypesGet();
			vehicleTypes = response || [];
		} catch (error) {
			console.error("Failed to load vehicle types:", error);
			toast.error(m["deliveryman_registration.messages.error"]());
		} finally {
			vehicleTypesLoading = false;
		}
	}

	$effect(() => {
		loadVehicleTypes();
	});

	const deliverymanRegistrationSchema = z
		.object({
			firstName: z.string().min(2, m["deliveryman_registration.validation.first_name_required"]()),
			lastName: z.string().min(2, m["deliveryman_registration.validation.last_name_required"]()),
			email: z.string().email(m["deliveryman_registration.validation.email_invalid"]()),
			phone: z.string().min(1, m["deliveryman_registration.validation.phone_required"]()),
			password: z.string().min(8, m["deliveryman_registration.validation.password_min_length"]()),
			confirmPassword: z
				.string()
				.min(8, m["deliveryman_registration.validation.confirm_password_required"]()),
			vehicleType: z
				.string()
				.min(1, m["deliveryman_registration.validation.vehicle_type_required"]()),
			vehicleModel: z.string(),
			city: z.string().min(2, m["deliveryman_registration.validation.city_required"]()),
			postalCode: z.string().regex(/^\d{5}$/, {
				message: m["deliveryman_registration.validation.postal_code_invalid"]()
			}),
			attestation: z.literal(true, {
				message: m["deliveryman_registration.validation.attestation_required"]()
			}),
			technicalInspection: z.any().optional(),
			vehicleInsurance: z.any().optional(),
			professionalLiability: z.any().optional(),
			driverLicense: z.any().optional(),
			transportLicense: z.any().optional(),
			vehicleRegistration: z.any().optional()
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: m["deliveryman_registration.validation.passwords_mismatch"](),
			path: ["confirmPassword"]
		})
		.refine(
			(data) => {
				const selectedVehicleType = vehicleTypes.find((v) => v.id?.toString() == data.vehicleType);
				const needsDocuments = selectedVehicleType?.needsDocuments === true;
				return !needsDocuments || data.technicalInspection;
			},
			{
				message: m["deliveryman_registration.validation.technical_inspection_required"](),
				path: ["technicalInspection"]
			}
		)
		.refine(
			(data) => {
				const selectedVehicleType = vehicleTypes.find((v) => v.id?.toString() == data.vehicleType);
				const needsDocuments = selectedVehicleType?.needsDocuments === true;
				return !needsDocuments || data.vehicleInsurance;
			},
			{
				message: m["deliveryman_registration.validation.vehicle_insurance_required"](),
				path: ["vehicleInsurance"]
			}
		)
		.refine(
			(data) => {
				const selectedVehicleType = vehicleTypes.find((v) => v.id?.toString() == data.vehicleType);
				const needsDocuments = selectedVehicleType?.needsDocuments === true;
				return !needsDocuments || data.professionalLiability;
			},
			{
				message: m["deliveryman_registration.validation.professional_liability_required"](),
				path: ["professionalLiability"]
			}
		)
		.refine(
			(data) => {
				const selectedVehicleType = vehicleTypes.find((v) => v.id?.toString() == data.vehicleType);
				const needsDocuments = selectedVehicleType?.needsDocuments === true;
				return !needsDocuments || data.driverLicense;
			},
			{
				message: m["deliveryman_registration.validation.driver_license_required"](),
				path: ["driverLicense"]
			}
		)
		.refine(
			(data) => {
				const selectedVehicleType = vehicleTypes.find((v) => v.id?.toString() === data.vehicleType);
				const needsDocuments = selectedVehicleType?.needsDocuments === true;
				return !needsDocuments || data.transportLicense;
			},
			{
				message: m["deliveryman_registration.validation.transport_license_required"](),
				path: ["transportLicense"]
			}
		)
		.refine(
			(data) => {
				const selectedVehicleType = vehicleTypes.find((v) => v.id?.toString() === data.vehicleType);
				const needsDocuments = selectedVehicleType?.needsDocuments === true;
				return !needsDocuments || data.vehicleRegistration;
			},
			{
				message: m["deliveryman_registration.validation.vehicle_registration_required"](),
				path: ["vehicleRegistration"]
			}
		);

	const { form, errors, isSubmitting, data, reset } = createForm({
		validate: createZodValidator(deliverymanRegistrationSchema),
		onSubmit: async (values) => {
			try {
				reset();

				await api.courier.authRegisterCourierPost({
					registration: {
						firstName: values.firstName,
						lastName: values.lastName,
						email: values.email,
						phone: values.phone,
						password: values.password,
						confirmPassword: values.confirmPassword,
						vehicleType: parseInt(values.vehicleType, 10),
						vehicleModel: values.vehicleModel || undefined,
						city: values.city,
						postalCode: values.postalCode,
						attestation: values.attestation,
						technicalInspection: values.technicalInspection || undefined,
						vehicleInsurance: values.vehicleInsurance || undefined,
						professionalLiability: values.professionalLiability || undefined,
						driverLicense: values.driverLicense || undefined,
						transportLicense: values.transportLicense || undefined,
						vehicleRegistration: values.vehicleRegistration || undefined
					}
				});

				toast.success(m["deliveryman_registration.messages.success"]());
			} catch (error) {
				console.error("Registration failed:", error);
				toast.error(m["deliveryman_registration.messages.error"]());
			}
		}
	});

	$effect(() => {
		console.log($data.vehicleType);
	});

	const vehicleTypeTriggerContent = $derived(
		vehicleTypes.find((v) => v.id?.toString() === $data.vehicleType)?.label ??
			m["deliveryman_registration.labels.vehicle_type"]()
	);

	const isVehicle = $derived(
		$data.vehicleType &&
			vehicleTypes.find((v) => v.id?.toString() == $data.vehicleType)?.needsDocuments == true
	);

	async function fileToBase64(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				const result = reader.result as string;
				// Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
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
			const maxSize = 10 * 1024 * 1024; // 10MB in bytes
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
					m["deliveryman_registration.validation.file_too_large"]().replace("{filename}", file.name)
				);
				return;
			}

			if (!allowedTypes.includes(file.type)) {
				target.value = "";
				toast.error(
					m["deliveryman_registration.messages.file_format_invalid"]({
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
				toast.error(m["deliveryman_registration.messages.error"]());
			}
		}
	}
</script>

<svelte:head>
	<title>{m["deliveryman_registration.title"]()}</title>
	<meta name="description" content={m["deliveryman_registration.meta_description"]()} />
</svelte:head>

<div class="min-h-screen bg-background py-20">
	<div class="container mx-auto max-w-4xl px-4">
		<div class="mb-12 text-center">
			<h1 class="mb-6 text-3xl font-bold text-foreground lg:text-4xl">
				{m["deliveryman_registration.main_title"]()}
			</h1>
			<p class="mx-auto max-w-3xl text-lg text-muted-foreground">
				{m["deliveryman_registration.subtitle"]()}
			</p>
		</div>

		<Card.Root>
			<Card.Header>
				<Card.Title class="text-2xl">{m["deliveryman_registration.form_title"]()}</Card.Title>
				<Card.Description>
					{m["deliveryman_registration.form_description"]()}
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<form method="POST" use:form>
					<div class="grid gap-6 md:grid-cols-2">
						<div>
							<Label class="mb-2 block text-sm font-medium">
								{m["deliveryman_registration.labels.first_name"]()}
							</Label>
							<Input
								name="firstName"
								type="text"
								placeholder={m["deliveryman_registration.placeholders.first_name"]()}
								disabled={$isSubmitting}
							/>
							{#if $errors.firstName}
								<p class="mt-1 text-sm text-destructive">{$errors.firstName}</p>
							{/if}
						</div>

						<div>
							<Label class="mb-2 block text-sm font-medium">
								{m["deliveryman_registration.labels.last_name"]()}
							</Label>
							<Input
								type="text"
								name="lastName"
								placeholder={m["deliveryman_registration.placeholders.last_name"]()}
								disabled={$isSubmitting}
							/>
							{#if $errors.lastName}
								<p class="mt-1 text-sm text-destructive">{$errors.lastName}</p>
							{/if}
						</div>

						<div>
							<Label class="mb-2 block text-sm font-medium">
								{m["deliveryman_registration.labels.email"]()}
							</Label>
							<Input
								type="email"
								name="email"
								placeholder={m["deliveryman_registration.placeholders.email"]()}
								disabled={$isSubmitting}
							/>
							{#if $errors.email}
								<p class="mt-1 text-sm text-destructive">{$errors.email}</p>
							{/if}
						</div>

						<div>
							<Label class="mb-2 block text-sm font-medium">
								{m["deliveryman_registration.labels.phone"]()}
							</Label>
							<PhoneInput
								defaultCountry="FR"
								name="phone"
								placeholder={m["deliveryman_registration.placeholders.phone"]()}
							/>
							{#if $errors.phone}
								<p class="mt-1 text-sm text-destructive">{$errors.phone}</p>
							{/if}
						</div>

						<div>
							<Label class="mb-2 block text-sm font-medium">
								{m["deliveryman_registration.labels.password"]()}
							</Label>
							<Input
								type="password"
								name="password"
								placeholder={m["deliveryman_registration.placeholders.password"]()}
								disabled={$isSubmitting}
							/>
							{#if $errors.password}
								<p class="mt-1 text-sm text-destructive">{$errors.password}</p>
							{/if}
						</div>

						<div>
							<Label class="mb-2 block text-sm font-medium">
								{m["deliveryman_registration.labels.confirm_password"]()}
							</Label>
							<Input
								type="password"
								name="confirmPassword"
								placeholder={m["deliveryman_registration.placeholders.confirm_password"]()}
								disabled={$isSubmitting}
							/>
							{#if $errors.confirmPassword}
								<p class="mt-1 text-sm text-destructive">{$errors.confirmPassword}</p>
							{/if}
						</div>

						<div>
							<Label class="mb-2 block text-sm font-medium">
								{m["deliveryman_registration.labels.vehicle_type"]()}
							</Label>
							<Select.Root
								type="single"
								name="vehicleType"
								onValueChange={(v) => ($data.vehicleType = v)}
								disabled={$isSubmitting}
							>
								<Select.Trigger class="w-full">
									{vehicleTypeTriggerContent}
								</Select.Trigger>
								<Select.Content>
									<Select.Group>
										{#each vehicleTypes as vehicleType (vehicleType.id)}
											<Select.Item value={vehicleType.id!.toString()} label={vehicleType.label}>
												{vehicleType.label}
											</Select.Item>
										{/each}
									</Select.Group>
								</Select.Content>
							</Select.Root>
							{#if $errors.vehicleType}
								<p class="mt-1 text-sm text-destructive">{$errors.vehicleType}</p>
							{/if}
						</div>

						{#if isVehicle}
							<div>
								<Label class="mb-2 block text-sm font-medium">
									{m["deliveryman_registration.labels.vehicle_model"]()}
								</Label>
								<Input
									type="text"
									name="vehicleModel"
									placeholder={m["deliveryman_registration.placeholders.vehicle_model"]()}
									disabled={$isSubmitting}
								/>
								{#if $errors.vehicleModel}
									<p class="mt-1 text-sm text-destructive">{$errors.vehicleModel}</p>
								{/if}
							</div>
						{/if}

						<div>
							<Label class="mb-2 block text-sm font-medium">
								{m["deliveryman_registration.labels.city"]()}
							</Label>
							<Input
								type="text"
								name="city"
								placeholder={m["deliveryman_registration.placeholders.city"]()}
								disabled={$isSubmitting}
							/>
							{#if $errors.city}
								<p class="mt-1 text-sm text-destructive">{$errors.city}</p>
							{/if}
						</div>

						<div>
							<Label class="mb-2 block text-sm font-medium">
								{m["deliveryman_registration.labels.postal_code"]()}
							</Label>
							<Input
								type="text"
								name="postalCode"
								placeholder={m["deliveryman_registration.placeholders.postal_code"]()}
								disabled={$isSubmitting}
							/>
							{#if $errors.postalCode}
								<p class="mt-1 text-sm text-destructive">{$errors.postalCode}</p>
							{/if}
						</div>
					</div>

					{#if isVehicle}
						<div class="mt-6 space-y-6">
							<h3 class="text-lg font-semibold">
								{m["deliveryman_registration.sections.documents"]()}
							</h3>

							<div class="grid gap-6 md:grid-cols-2">
								<div>
									<Label class="mb-2 block text-sm font-medium" for="technicalInspection">
										{m["deliveryman_registration.labels.technical_inspection"]()}
									</Label>
									<Input
										name="technicalInspection"
										type="file"
										accept="image/*,.pdf"
										onchange={(e) => handleFileUpload(e, "technicalInspection")}
										disabled={$isSubmitting}
									/>
									{#if $errors.technicalInspection}
										<p class="mt-1 text-sm text-destructive">{$errors.technicalInspection}</p>
									{/if}
								</div>

								<div>
									<Label class="mb-2 block text-sm font-medium" for="vehicleInsurance">
										{m["deliveryman_registration.labels.vehicle_insurance"]()}
									</Label>
									<Input
										name="vehicleInsurance"
										type="file"
										accept="image/*,.pdf"
										onchange={(e) => handleFileUpload(e, "vehicleInsurance")}
										disabled={$isSubmitting}
									/>
									{#if $errors.vehicleInsurance}
										<p class="mt-1 text-sm text-destructive">{$errors.vehicleInsurance}</p>
									{/if}
								</div>

								<div>
									<Label class="mb-2 block text-sm font-medium" for="professionalLiability">
										{m["deliveryman_registration.labels.professional_liability"]()}
									</Label>
									<Input
										name="professionalLiability"
										type="file"
										accept="image/*,.pdf"
										onchange={(e) => handleFileUpload(e, "professionalLiability")}
										disabled={$isSubmitting}
									/>
									{#if $errors.professionalLiability}
										<p class="mt-1 text-sm text-destructive">{$errors.professionalLiability}</p>
									{/if}
								</div>

								<div>
									<Label class="mb-2 block text-sm font-medium">
										{m["deliveryman_registration.labels.driver_license"]()}
									</Label>
									<Input
										name="driverLicense"
										type="file"
										accept="image/*,.pdf"
										onchange={(e) => handleFileUpload(e, "driverLicense")}
										disabled={$isSubmitting}
									/>
									{#if $errors.driverLicense}
										<p class="mt-1 text-sm text-destructive">{$errors.driverLicense}</p>
									{/if}
								</div>

								<div>
									<Label class="mb-2 block text-sm font-medium" for="transportLicense">
										{m["deliveryman_registration.labels.transport_license"]()}
									</Label>
									<Input
										name="transportLicense"
										type="file"
										accept="image/*,.pdf"
										onchange={(e) => handleFileUpload(e, "transportLicense")}
										disabled={$isSubmitting}
									/>
									{#if $errors.transportLicense}
										<p class="mt-1 text-sm text-destructive">{$errors.transportLicense}</p>
									{/if}
								</div>

								<div>
									<Label class="mb-2 block text-sm font-medium" for="vehicleRegistration">
										{m["deliveryman_registration.labels.vehicle_registration"]()}
									</Label>
									<Input
										name="vehicleRegistration"
										type="file"
										accept="image/*,.pdf"
										onchange={(e) => handleFileUpload(e, "vehicleRegistration")}
										disabled={$isSubmitting}
									/>
									{#if $errors.vehicleRegistration}
										<p class="mt-1 text-sm text-destructive">{$errors.vehicleRegistration}</p>
									{/if}
								</div>
							</div>
						</div>
					{/if}

					<div class="mt-6">
						<label class="flex items-center space-x-2">
							<Checkbox
								name="attestation"
								checked={$data.attestation}
								onCheckedChange={(b) => ($data.attestation = b)}
							/>
							<span class="text-sm">
								{m["deliveryman_registration.attestation_text.with_vehicle"]()}
							</span>
						</label>
						{#if $errors.attestation}
							<p class="mt-1 text-sm text-destructive">{$errors.attestation}</p>
						{/if}
					</div>

					<div class="mt-6 flex justify-end">
						<Button type="submit" disabled={$isSubmitting}>
							{$isSubmitting
								? m["deliveryman_registration.submitting"]()
								: m["deliveryman_registration.submit_button"]()}
						</Button>
					</div>
				</form>
			</Card.Content>
		</Card.Root>
	</div>
</div>
