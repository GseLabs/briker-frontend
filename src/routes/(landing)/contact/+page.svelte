<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from "$lib/components/ui/card";
	import { config } from "$lib/config/config";
	import { createForm, Field, Form, reset } from "@formisch/svelte";
	import * as v from "valibot";
	import { m } from "$lib/paraglide/messages.js";

	import MapPin from "@lucide/svelte/icons/map-pin";
	import Mail from "@lucide/svelte/icons/mail";
	import Phone from "@lucide/svelte/icons/phone";

	const ContactSchema = v.object({
		name: v.pipe(v.string(), v.minLength(2, m["validation.name_required"]())),
		email: v.pipe(v.string(), v.email(m["validation.email_invalid"]())),
		phone: v.pipe(v.string(), v.minLength(10, m["validation.phone_invalid"]())),
		subject: v.pipe(v.string(), v.minLength(5, m["validation.subject_required"]())),
		message: v.pipe(v.string(), v.minLength(10, m["validation.message_required"]()))
	});

	const contactForm = createForm({ schema: ContactSchema });

	interface ContactFormData {
		name: string;
		email: string;
		phone: string;
		subject: string;
		message: string;
	}

	let isSubmitting: boolean = false;
	let submitMessage: string = "";

	async function handleSubmit(output: ContactFormData): Promise<void> {
		isSubmitting = true;
		submitMessage = "";

		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// TODO: Intégration OpenAPI future

			console.log("Form submitted:", output);

			submitMessage = m["contact_form.success"]();

			reset(contactForm);
		} catch (error) {
			submitMessage = m["contact_form.error"]();
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>{m["contact.title"]()} - Briker</title>
	<meta name="description" content={m["contact.meta_description"]()} />
</svelte:head>

<div class="min-h-screen bg-background py-20">
	<div class="container mx-auto max-w-6xl px-4">
		<!-- Header -->
		<div class="mb-20 text-center">
			<h1 class="mb-6 text-4xl font-bold text-foreground lg:text-5xl">{m["contact.title"]()}</h1>
			<p class="mx-auto max-w-2xl text-lg text-muted-foreground">
				{m["contact.subtitle"]()}
			</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-5">
			<div class="lg:col-span-3">
				<Card class="h-fit">
					<CardHeader class="pb-4">
						<CardTitle class="text-xl">{m["contact_form.form_title"]()}</CardTitle>
						<CardDescription class="text-sm">
							{m["contact_form.form_description"]()}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Form of={contactForm} onsubmit={handleSubmit}>
							<div class="space-y-4">
								<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
									<Field of={contactForm} path={["name"]}>
										{#snippet children(field)}
											<div class="space-y-2">
												<label for="name" class="text-sm font-medium text-foreground"
													>{m["contact_form.name_label"]()} *</label
												>
												<input
													id="name"
													{...field.props}
													value={field.input}
													placeholder={m["contact_form.name_placeholder"]()}
													class="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none"
												/>
												{#if field.errors}
													<div class="text-sm text-red-600">{field.errors[0]}</div>
												{/if}
											</div>
										{/snippet}
									</Field>

									<Field of={contactForm} path={["email"]}>
										{#snippet children(field)}
											<div class="space-y-2">
												<label for="email" class="text-sm font-medium text-foreground"
													>{m["contact_form.email_label"]()} *</label
												>
												<input
													id="email"
													{...field.props}
													value={field.input}
													type="email"
													placeholder={m["contact_form.email_placeholder"]()}
													class="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none"
												/>
												{#if field.errors}
													<div class="text-sm text-red-600">{field.errors[0]}</div>
												{/if}
											</div>
										{/snippet}
									</Field>
								</div>

								<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
									<Field of={contactForm} path={["phone"]}>
										{#snippet children(field)}
											<div class="space-y-2">
												<label for="phone" class="text-sm font-medium text-foreground"
													>{m["contact_form.phone_label"]()}</label
												>
												<input
													id="phone"
													{...field.props}
													value={field.input}
													type="tel"
													placeholder={m["contact_form.phone_placeholder"]()}
													class="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none"
												/>
												{#if field.errors}
													<div class="text-sm text-red-600">{field.errors[0]}</div>
												{/if}
											</div>
										{/snippet}
									</Field>

									<Field of={contactForm} path={["subject"]}>
										{#snippet children(field)}
											<div class="space-y-2">
												<label for="subject" class="text-sm font-medium text-foreground"
													>{m["contact_form.subject_label"]()} *</label
												>
												<input
													id="subject"
													{...field.props}
													value={field.input}
													placeholder={m["contact_form.subject_placeholder"]()}
													class="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none"
												/>
												{#if field.errors}
													<div class="text-sm text-red-600">{field.errors[0]}</div>
												{/if}
											</div>
										{/snippet}
									</Field>
								</div>

								<Field of={contactForm} path={["message"]}>
									{#snippet children(field)}
										<div class="space-y-2">
											<label for="message" class="text-sm font-medium text-foreground"
												>{m["contact_form.message_label"]()} *</label
											>
											<textarea
												id="message"
												{...field.props}
												value={field.input}
												placeholder={m["contact_form.message_placeholder"]()}
												rows="4"
												class="w-full resize-none rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none"
											></textarea>
											{#if field.errors}
												<div class="text-sm text-red-600">{field.errors[0]}</div>
											{/if}
										</div>
									{/snippet}
								</Field>

								{#if submitMessage}
									<div
										class="rounded-lg p-4 {submitMessage.includes('Merci')
											? 'border border-green-200 bg-green-50 text-green-800'
											: 'border border-red-200 bg-red-50 text-red-800'}"
									>
										{submitMessage}
									</div>
								{/if}

								<Button
									type="submit"
									class="h-10 w-full bg-primary text-sm text-primary-foreground hover:bg-primary/90"
									disabled={isSubmitting}
								>
									{#if isSubmitting}
										<span class="mr-2 animate-spin">⟳</span>
										{m["contact_form.sending"]()}
									{:else}
										{m["contact_form.send"]()}
									{/if}
								</Button>
							</div>
						</Form>
					</CardContent>
				</Card>

				<!-- Téléchargement de l'app -->
				<Card class="mt-8">
					<CardHeader>
						<CardTitle>{m["contact_form.quick_help_title"]()}</CardTitle>
						<CardDescription>
							{m["contact_form.quick_help_description"]()}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div class="flex flex-col justify-center gap-4 space-x-4 sm:flex-row">
							<a href={config.apps.googlePlay} target="_blank" rel="noopener noreferrer">
								<img
									src="/img/landing/google_play.svg"
									alt="Get it on Google Play"
									class="h-16 w-auto"
								/>
							</a>
							<a href={config.apps.appStore} target="_blank" rel="noopener noreferrer">
								<img
									src="/img/landing/app_store.svg"
									alt="Download on the App Store"
									class="h-16 w-auto"
								/>
							</a>
						</div>
					</CardContent>
				</Card>
			</div>

			<!-- Informations de contact -->
			<div class="space-y-6 lg:col-span-2">
				<!-- Informations de contact -->
				<Card>
					<CardHeader>
						<CardTitle>{m["contact_form.contact_info_title"]()}</CardTitle>
						<CardDescription>{m["contact_form.contact_info_description"]()}</CardDescription>
					</CardHeader>
					<CardContent class="space-y-4">
						<div class="flex items-start space-x-4">
							<div class="mt-1 h-6 w-6 flex-shrink-0">
								<MapPin class="h-full w-full text-primary" />
							</div>
							<div>
								<h3 class="mb-1 font-semibold text-foreground">
									{m["contact_form.address_label"]()}
								</h3>
								<p class="text-muted-foreground">{config.address}</p>
							</div>
						</div>

						<div class="flex items-start space-x-4">
							<div class="mt-1 h-6 w-6 flex-shrink-0">
								<Mail class="h-full w-full text-primary" />
							</div>
							<div>
								<h3 class="mb-1 font-semibold text-foreground">
									{m["contact_form.email_label"]()}
								</h3>
								<div class="space-y-2">
									<p class="text-muted-foreground">
										<span class="font-medium">{m["contact_form.customer_service"]()}</span><br />
										<a
											href="mailto:{config.email.contact}"
											class="text-primary underline-offset-4 hover:text-primary/80 hover:underline"
										>
											{config.email.contact}
										</a>
									</p>
									<p class="text-muted-foreground">
										<span class="font-medium">{m["contact_form.personal_data"]()}</span><br />
										<a
											href="mailto:{config.email.dpo}"
											class="text-primary underline-offset-4 hover:text-primary/80 hover:underline"
										>
											{config.email.dpo}
										</a>
									</p>
								</div>
							</div>
						</div>

						<div class="flex items-start space-x-4">
							<div class="mt-1 h-6 w-6 flex-shrink-0">
								<Phone class="h-full w-full text-primary" />
							</div>
							<div>
								<h3 class="mb-1 font-semibold text-foreground">
									{m["contact_form.phone_label_contact"]()}
								</h3>
								<a
									href="tel:{config.phone}"
									class="text-primary underline-offset-4 hover:text-primary/80 hover:underline"
								>
									{config.phone}
								</a>
							</div>
						</div>
					</CardContent>
				</Card>

				<!-- Horaires de disponibilité -->
				<Card>
					<CardHeader>
						<CardTitle>{m["contact_form.business_hours_title"]()}</CardTitle>
						<CardDescription>{m["contact_form.business_hours_description"]()}</CardDescription>
					</CardHeader>
					<CardContent>
						<div class="space-y-3">
							<div class="flex items-center justify-between border-b border-border py-2">
								<span class="font-medium text-foreground"
									>{m["business_hours.monday_friday"]()}</span
								>
								<span class="text-muted-foreground">{m["business_hours.hours_weekday"]()}</span>
							</div>
							<div class="flex items-center justify-between border-b border-border py-2">
								<span class="font-medium text-foreground">{m["business_hours.saturday"]()}</span>
								<span class="text-muted-foreground">{m["business_hours.hours_saturday"]()}</span>
							</div>
							<div class="flex items-center justify-between py-2">
								<span class="font-medium text-foreground">{m["business_hours.sunday"]()}</span>
								<span class="text-muted-foreground">{m["business_hours.closed"]()}</span>
							</div>
						</div>

						<div class="mt-6 rounded-lg bg-muted p-4">
							<p class="text-sm text-muted-foreground">
								<span class="font-medium text-foreground">{m["contact.hours_note"]()}</span>
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	</div>
</div>
