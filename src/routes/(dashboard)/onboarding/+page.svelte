<script lang="ts">
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { api } from "$lib/api/stores";
	import type { SchemaRole } from "$lib/api";
	import * as m from "$lib/paraglide/messages";
	import { Button } from "$lib/components/ui/button";
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from "$lib/components/ui/card";
	import {
		LoaderCircle,
		ExternalLink,
		RefreshCw,
		CheckCircle,
		AlertCircle,
		ArrowLeft,
		Home
	} from "@lucide/svelte";
	import { toast } from "svelte-sonner";

	interface Props {
		data: { user: any; role: SchemaRole };
	}

	let { data }: Props = $props();

	let onboardingStatus: any = $state(null);
	let loading = $state(true);
	let generatingLink = $state(false);
	let statusMessage: string | null = $state(null);
	let statusType: "complete" | "error" | "pending_verification" | null = $state(null);

	onMount(async () => {
		const urlParams = $page.url.searchParams;

		if (urlParams.get("onboarding") === "complete") {
			statusMessage = m["onboarding.complete_message"]();
			statusType = "complete";
			loading = false;
		} else if (urlParams.get("status") === "error") {
			statusMessage = m["onboarding.error_message"]();
			statusType = "error";
			loading = false;
		} else if (urlParams.get("status") === "success" || urlParams.get("success") === "true") {
			try {
				await checkOnboardingStatus();

				if (!onboardingStatus?.stripeActive) {
					statusMessage =
						"Votre compte Stripe est en cours de vérification. Des documents supplémentaires peuvent être requis.";
					statusType = "pending_verification";
				}
			} catch {
				statusMessage = m["onboarding.complete_message"]();
				statusType = "complete";
				loading = false;
			}
		} else {
			await checkOnboardingStatus();
		}
	});

	async function checkOnboardingStatus() {
		try {
			loading = true;

			if (data.role === "vendor") {
				onboardingStatus = await api.vendor.vendorOnboardingStatusGet();
			} else if (data.role === "courier") {
				onboardingStatus = await api.courier.courierOnboardingStatusGet();
			}

			if (onboardingStatus?.stripeActive) {
				goto("/dashboard", { replaceState: true });
				return;
			}
		} catch (err) {
			toast.error(m["onboarding.stripe_error"]());
		} finally {
			loading = false;
		}
	}

	async function generateStripeLink() {
		try {
			generatingLink = true;

			let response;
			if (data.role === "vendor") {
				response = await api.vendor.vendorStripeLinkPost();
			} else if (data.role === "courier") {
				response = await api.courier.courierStripeLinkPost();
			}

			if (response?.accountLink) {
				window.location.href = response.accountLink;
			} else {
				toast.error(m["onboarding.stripe_error"]());
			}
		} catch (err) {
			toast.error(m["onboarding.stripe_error"]());
		} finally {
			generatingLink = false;
		}
	}
</script>

<svelte:head>
	<title>{m["onboarding.title"]()}</title>
	<meta name="description" content={m["onboarding.subtitle"]()} />
</svelte:head>

<div class="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
	<div class="mx-auto w-full max-w-lg sm:max-w-md">
		<div class="mb-4 sm:mb-6">
			<a
				href="/"
				class="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
			>
				<ArrowLeft class="h-4 w-4" />
				<span class="text-sm font-medium">{m["onboarding.back_home"]()}</span>
			</a>
		</div>

		{#if statusType === "complete"}
			<Card class="w-full shadow-sm">
				<CardHeader class="px-4 pb-4 text-center sm:px-6 sm:pb-6">
					<div class="mx-auto mb-4 flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
						<CheckCircle class="h-12 w-12 text-green-600 sm:h-16 sm:w-16" />
					</div>
					<CardTitle class="text-xl leading-tight sm:text-2xl"
						>{m["onboarding.success_title"]()}</CardTitle
					>
					<CardDescription class="mt-2 text-sm leading-relaxed sm:text-base"
						>{m["onboarding.success_description"]()}</CardDescription
					>
				</CardHeader>
				<CardContent class="space-y-4 px-4 pt-0 sm:space-y-6 sm:px-6">
					<div class="space-y-4 text-center">
						<p class="text-sm leading-relaxed text-muted-foreground sm:text-base">
							{m["onboarding.success_text"]()}
						</p>
					</div>
				</CardContent>
			</Card>
		{:else if statusType === "error"}
			<Card class="w-full shadow-sm">
				<CardHeader class="px-4 pb-4 text-center sm:px-6 sm:pb-6">
					<div class="mx-auto mb-4 flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
						<AlertCircle class="h-12 w-12 text-red-600 sm:h-16 sm:w-16" />
					</div>
					<CardTitle class="text-xl leading-tight sm:text-2xl"
						>{m["onboarding.error_title"]()}</CardTitle
					>
					<CardDescription class="mt-2 text-sm leading-relaxed sm:text-base"
						>{m["onboarding.error_description"]()}</CardDescription
					>
				</CardHeader>
				<CardContent class="space-y-4 px-4 pt-0 sm:space-y-6 sm:px-6">
					<div class="space-y-4 text-center">
						<p class="text-sm leading-relaxed text-muted-foreground sm:text-base">
							{m["onboarding.error_text"]()}
						</p>
						<Button
							class="w-full"
							onclick={() => (window.location.href = window.location.pathname)}
						>
							{m["onboarding.retry"]()}
						</Button>
					</div>
				</CardContent>
			</Card>
		{:else}
			<Card class="w-full shadow-sm">
				<CardHeader class="px-4 pb-4 text-center sm:px-6 sm:pb-6">
					<CardTitle class="text-xl leading-tight sm:text-2xl">
						{onboardingStatus?.stripeActive
							? m["onboarding.success_title"]()
							: m["onboarding.title"]()}
					</CardTitle>
					<CardDescription class="mt-2 text-sm leading-relaxed sm:text-base">
						{onboardingStatus?.stripeActive
							? m["onboarding.success_description"]()
							: m["onboarding.subtitle"]()}
					</CardDescription>
				</CardHeader>
				<CardContent class="space-y-4 px-4 pt-0 sm:space-y-6 sm:px-6">
					{#if loading || !onboardingStatus?.stripeActive}
						<div class="space-y-4 rounded-lg border bg-muted/50 p-6">
							<div class="flex items-start gap-4">
								<div
									class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10"
								>
									<svg
										class="h-6 w-6 text-primary"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
										></path>
									</svg>
								</div>
								<div class="flex-1 space-y-3">
									<div>
										<h3 class="text-base font-semibold text-foreground">
											{m["onboarding.stripe_explanation_title"]()}
										</h3>
										<p class="text-sm text-muted-foreground">
											Partenaire de confiance pour vos paiements
										</p>
									</div>

									<div class="space-y-2">
										<div class="flex items-center gap-2">
											<div class="h-1.5 w-1.5 rounded-full bg-primary"></div>
											<p class="text-sm text-foreground">Paiements sécurisés et conformes</p>
										</div>
										<div class="flex items-center gap-2">
											<div class="h-1.5 w-1.5 rounded-full bg-primary"></div>
											<p class="text-sm text-foreground">Suivi simple de vos transactions</p>
										</div>
										<div class="flex items-center gap-2">
											<div class="h-1.5 w-1.5 rounded-full bg-primary"></div>
											<p class="text-sm text-foreground">Gestion automatique des commissions</p>
										</div>
									</div>

									<div class="border-t border-border pt-3">
										<p class="text-xs text-muted-foreground">
											<span class="font-medium text-foreground">Stripe Connect</span> est la solution
											référence utilisée par des milliers d'entreprises pour la gestion des paiements
											en ligne.
										</p>
									</div>
								</div>
							</div>
						</div>
					{/if}
					{#if loading}
						<div class="flex flex-col items-center space-y-4 py-8 sm:space-y-6 sm:py-12">
							<LoaderCircle class="h-10 w-10 animate-spin text-primary sm:h-12 sm:w-12" />
							<p class="text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
								{m["onboarding.preparing"]()}
							</p>
						</div>
					{:else if onboardingStatus?.stripeActive}
						<div class="flex flex-col items-center space-y-4 py-8 sm:space-y-6 sm:py-12">
							<div class="mx-auto flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
								<CheckCircle class="h-12 w-12 text-green-600 sm:h-16 sm:w-16" />
							</div>
							<div class="space-y-3 text-center sm:space-y-4">
								<p class="text-sm leading-relaxed font-medium sm:text-base">
									{m["onboarding.success_title"]()}
								</p>
								<p class="text-sm leading-relaxed text-muted-foreground sm:text-base">
									{m["onboarding.success_text"]()}
								</p>
							</div>
						</div>
					{:else}
						<div class="flex flex-col items-center space-y-4 py-6 sm:py-8">
							{#if onboardingStatus && !onboardingStatus.canGenerateStripeLink}
								<div class="w-full rounded-lg border border-amber-200 bg-amber-50 p-3 sm:p-4">
									<p class="text-center text-xs leading-relaxed text-amber-800 sm:text-sm">
										{m["onboarding.approval_required"]()}
									</p>
								</div>
							{/if}

							<div class="flex w-full flex-col gap-3 sm:flex-row">
								<Button
									class="h-12 min-w-0 flex-1 overflow-visible text-sm whitespace-normal sm:h-10"
									onclick={generateStripeLink}
									disabled={generatingLink ||
										(onboardingStatus && !onboardingStatus.canGenerateStripeLink)}
								>
									{#if generatingLink}
										<LoaderCircle class="mr-2 h-4 w-4 flex-shrink-0 animate-spin" />
									{:else}
										<ExternalLink class="mr-2 h-4 w-4 flex-shrink-0" />
									{/if}
									<span class="text-center"
										>{generatingLink
											? m["onboarding.stripe_loading"]()
											: m["onboarding.continue_to_stripe"]()}</span
									>
								</Button>
								<Button
									class="h-12 min-w-0 flex-1 overflow-visible text-sm whitespace-normal sm:h-10"
									variant="outline"
									onclick={checkOnboardingStatus}
									disabled={loading}
								>
									<RefreshCw
										class={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""} flex-shrink-0`}
									/>
									<span class="text-center">{m["onboarding.check_status"]()}</span>
								</Button>
							</div>
						</div>
					{/if}
				</CardContent>
			</Card>
		{/if}
	</div>
</div>
