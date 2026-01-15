<script lang="ts">
	import * as m from "$lib/paraglide/messages";
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import * as InputOTP from "$lib/components/ui/input-otp";
	import type { PageData } from "./$types";
	import { api } from "$lib/api";
	import { onMount } from "svelte";

	import CircleCheck from "@lucide/svelte/icons/circle-check";
	import CircleX from "@lucide/svelte/icons/circle-x";
	import LoaderCircle from "@lucide/svelte/icons/loader-circle";
	import Input from "$lib/components/ui/input/input.svelte";

	let { data }: { data: PageData } = $props();

	let status: "idle" | "loading" | "success" | "error" = $state("loading");
	let code = $state("");
	let phone = $state(data.phone);
	let smsResent = $state(false);
	let cooldown = $state(0);
	let cooldownInterval: NodeJS.Timeout;

	const sendSMS = async () => {
		try {
			await api.verification.verificationSendPhonePost();
			status = "idle";
		} catch (error: any) {
			status = "error";
		}
	};

	const startCooldown = () => {
		cooldown = 30;
		cooldownInterval = setInterval(() => {
			cooldown--;
			if (cooldown <= 0) {
				clearInterval(cooldownInterval);
			}
		}, 1000);
	};

	const resendSMS = async () => {
		if (cooldown > 0) return;

		status = "loading";
		smsResent = false;
		await sendSMS();
		smsResent = true;
		startCooldown();

		setTimeout(() => {
			smsResent = false;
		}, 3000);
	};

	const submitVerification = async () => {
		if (!code.trim() || !phone.trim()) {
			status = "error";
			return;
		}

		status = "loading";
		try {
			await api.verification.verificationVerifyPhonePost({
				body: { code: code.trim(), phone: phone.trim() }
			});
			status = "success";

			setTimeout(() => {
				window.location.href = "/dashboard";
			}, 2000);
		} catch (error: any) {
			status = "error";
		}
	};

	onMount(() => {
		sendSMS();
	});
</script>

<svelte:head>
	<title>{m["verify_phone.meta_title"]?.() || "Vérification du téléphone - Briker"}</title>
	<meta
		name="description"
		content={m["verify_phone.meta_description"]?.() ||
			"Vérifiez votre numéro de téléphone pour sécuriser votre compte Briker"}
	/>
	<meta name="robots" content="noindex, nofollow" />
	<link rel="canonical" href="/verify-phone" />
</svelte:head>

<div class="flex min-h-screen items-center justify-center p-3 sm:p-4 lg:p-6">
	<div class="w-full max-w-md px-2 sm:px-0">
		<Card.Root class="rounded-lg border-0 shadow-lg">
			<Card.Header class="px-4 pt-6 text-center sm:px-6">
				<Card.Title class="text-xl font-bold break-words text-foreground sm:text-2xl">
					{m["verify_phone.title"]()}
				</Card.Title>
			</Card.Header>

			<Card.Content class="space-y-6 px-4 pb-6 text-center sm:px-6">
				{#if status === "idle" || status === "loading"}
					<div class="space-y-4">
						<p class="text-muted-foreground">{m["verify_phone.instruction"]()}</p>

						<div class="space-y-4">
							<div class="text-left">
								<label for="phone" class="text-sm font-medium text-foreground">
									{m["verify_phone.phone_label"]()}
								</label>
								<Input
									id="phone"
									type="tel"
									bind:value={phone}
									placeholder={m["verify_phone.phone_placeholder"]()}
									class="mt-1 w-full rounded-md border border-input bg-muted px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
									readonly
								/>
							</div>

							<div class="flex flex-col space-y-2 text-center">
								<label
									for="verification-code"
									class="mb-2 block text-sm font-medium text-foreground"
								>
									{m["verify_phone.code_label"]()}
								</label>
								<InputOTP.Root
									id="verification-code"
									bind:value={code}
									maxlength={6}
									class="mx-auto"
									disabled={status === "loading"}
								>
									{#snippet children({ cells })}
										<InputOTP.Group>
											<InputOTP.Slot cell={cells[0]} />
											<InputOTP.Slot cell={cells[1]} />
											<InputOTP.Slot cell={cells[2]} />
										</InputOTP.Group>
										<InputOTP.Separator />
										<InputOTP.Group>
											<InputOTP.Slot cell={cells[3]} />
											<InputOTP.Slot cell={cells[4]} />
											<InputOTP.Slot cell={cells[5]} />
										</InputOTP.Group>
									{/snippet}
								</InputOTP.Root>
							</div>
						</div>

						<Button
							onclick={submitVerification}
							disabled={status === "loading" || code.length !== 6 || !phone.trim()}
							class="w-full"
						>
							{#if status === "loading"}
								<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
								{m["verify_phone.verifying"]()}
							{:else}
								{m["verify_phone.verify_button"]()}
							{/if}
						</Button>

						<button
							onclick={resendSMS}
							disabled={status === "loading" || cooldown > 0}
							class="text-sm text-muted-foreground underline transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
						>
							{#if cooldown > 0}
								{m["verify_phone.resend_sms_wait"]({ cooldown })}
							{:else}
								{m["verify_phone.resend_sms"]()}
							{/if}
						</button>
					</div>
				{:else if status === "success"}
					<div class="space-y-4">
						<div
							class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
						>
							<CircleCheck class="h-8 w-8 text-green-600" />
						</div>
						<div class="space-y-2">
							<h2 class="text-xl font-semibold text-green-800">{m["verify_phone.success"]()}</h2>
							<p class="text-muted-foreground">{m["verify_phone.success_message"]()}</p>
						</div>
					</div>
				{:else}
					<div class="space-y-4">
						<div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
							<CircleX class="h-8 w-8 text-red-600" />
						</div>
						<div class="space-y-2">
							<h2 class="text-xl font-semibold text-red-800">{m["verify_phone.error"]()}</h2>
							<p class="text-muted-foreground">{m["verify_phone.error_message"]()}</p>
						</div>
						<div class="space-y-2">
							<Button
								onclick={() => {
									status = "idle";
									code = "";
								}}
								variant="outline"
								class="w-full"
							>
								{m["verify_phone.try_again"]()}
							</Button>
							<Button href="/" variant="ghost" class="w-full">
								{m["verify_phone.back_home"]()}
							</Button>
						</div>
					</div>
				{/if}
			</Card.Content>
		</Card.Root>
	</div>
</div>
