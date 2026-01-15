<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import * as Card from "$lib/components/ui/card";
	import { api } from "$lib/api";
	import * as m from "$lib/paraglide/messages";

	import CheckCircle from "@lucide/svelte/icons/check-circle";
	import ArrowLeft from "@lucide/svelte/icons/arrow-left";

	let email = $state("");
	let isLoading = $state(false);
	let error = $state("");
	let success = $state(false);

	const handleSubmit = async (e: Event) => {
		e.preventDefault();

		if (!email) {
			error = m["forgot_password.error_required"]();
			return;
		}

		isLoading = true;
		error = "";

		try {
			await api.verification.verificationSendPasswordResetPost({ body: { email } });
			success = true;
		} catch (err: any) {
			error = err?.message || m["forgot_password.error_failed"]();
		} finally {
			isLoading = false;
		}
	};
</script>

<svelte:head>
	<title>{m["forgot_password.title"]()} - BRIKER</title>
</svelte:head>

<div class="flex min-h-screen">
	<!-- Left side - Image/Branding -->
	<div class="relative hidden overflow-hidden lg:flex lg:w-1/2">
		<img
			src="/img/login/background.webp"
			alt="Briker Reset Password Background"
			class="absolute inset-0 h-full w-full object-cover"
		/>
	</div>

	<!-- Right side - Reset Password Form -->
	<div class="flex w-full items-center justify-center bg-background p-8 lg:w-1/2">
		<div class="w-full max-w-md space-y-4">
			<!-- Back to Login Link -->
			<div>
				<a
					href="/login"
					class="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
				>
					<ArrowLeft class="mr-2 h-4 w-4" />
					{m["forgot_password.back_to_login"]()}
				</a>
			</div>

			<!-- Reset Password Form -->
			<Card.Root>
				<Card.Header class="space-y-4">
					<div class="space-y-2 text-center">
						{#if success}
							<div
								class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100"
							>
								<CheckCircle class="h-6 w-6 text-green-600" />
							</div>
							<Card.Title class="text-2xl font-bold text-gray-900">
								{m["forgot_password.success_title"]()}
							</Card.Title>
							<Card.Description class="text-gray-600">
								{m["forgot_password.success_message"]()}
							</Card.Description>
						{:else}
							<Card.Title class="text-2xl font-bold text-gray-900">
								{m["forgot_password.title"]()}
							</Card.Title>
							<Card.Description class="text-gray-600">
								{m["forgot_password.subtitle"]()}
							</Card.Description>
						{/if}
					</div>
				</Card.Header>

				{#if !success}
					<Card.Content class="space-y-6">
						<form onsubmit={handleSubmit} class="space-y-4">
							<!-- Email Field -->
							<div class="space-y-2">
								<Label for="email" class="text-sm font-medium text-gray-700">
									{m["forgot_password.email_label"]()}
								</Label>
								<Input
									id="email"
									type="email"
									bind:value={email}
									placeholder={m["forgot_password.email_placeholder"]()}
									class="h-12"
									disabled={isLoading}
									required
								/>
							</div>

							<!-- Error Message -->
							{#if error}
								<div class="rounded-lg bg-red-50 p-3 text-center text-sm text-red-600">
									{error}
								</div>
							{/if}

							<!-- Send Button -->
							<Button
								type="submit"
								class="h-12 w-full bg-cyan-600 font-medium text-white hover:bg-primary"
								disabled={isLoading}
							>
								{#if isLoading}
									{m["forgot_password.sending"]()}
								{:else}
									{m["forgot_password.send_button"]()}
								{/if}
							</Button>
						</form>
					</Card.Content>
				{:else}
					<Card.Content>
						<Button
							onclick={() => (window.location.href = "/login")}
							class="h-12 w-full bg-cyan-600 font-medium text-white hover:bg-primary"
						>
							{m["forgot_password.back_to_login"]()}
						</Button>
					</Card.Content>
				{/if}
			</Card.Root>
		</div>
	</div>
</div>
