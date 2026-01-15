<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import * as Card from "$lib/components/ui/card";
	import { login } from "$lib/api";
	import { goto } from "$app/navigation";
	import * as m from "$lib/paraglide/messages";

	import Eye from "@lucide/svelte/icons/eye";
	import EyeOff from "@lucide/svelte/icons/eye-off";
	import ArrowLeft from "@lucide/svelte/icons/arrow-left";

	let email = $state("");
	let password = $state("");
	let showPassword = $state(false);
	let isLoading = $state(false);
	let error = $state("");

	const handleSubmit = async (e: Event) => {
		e.preventDefault();

		if (!email || !password) {
			error = m["login.error_required"]();
			return;
		}

		isLoading = true;
		error = "";

		try {
			await login({ email, password });
			goto("/dashboard");
		} catch (err: any) {
			error = err?.message || m["login.error_failed"]();
		} finally {
			isLoading = false;
		}
	};
</script>

<svelte:head>
	<title>{m["login.title"]()} - BRIKER</title>
</svelte:head>

<div class="flex min-h-screen">
	<!-- Left side - Image/Branding -->
	<div class="relative hidden overflow-hidden lg:flex lg:w-1/2">
		<img
			src="/img/login/background.webp"
			alt="Briker Login Background"
			class="absolute inset-0 h-full w-full object-cover"
		/>
	</div>

	<!-- Right side - Login Form -->
	<div class="flex w-full items-center justify-center bg-background p-8 lg:w-1/2">
		<div class="w-full max-w-md space-y-4">
			<!-- Back to Home Link -->
			<div>
				<a
					href="/"
					class="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
				>
					<ArrowLeft class="mr-2 h-4 w-4" />
					{m["nav.back_to_home"]()}
				</a>
			</div>

			<!-- Login Form -->
			<Card.Root>
				<Card.Header class="space-y-4">
					<div class="space-y-2 text-center">
						<Card.Title class="text-2xl font-bold text-gray-900">
							{m["login.title"]()}
						</Card.Title>
						<Card.Description class="text-gray-600">
							{m["login.subtitle"]()}
						</Card.Description>
					</div>
				</Card.Header>

				<Card.Content class="space-y-6">
					<form onsubmit={handleSubmit} class="space-y-4">
						<!-- Email Field -->
						<div class="space-y-2">
							<Label for="email" class="text-sm font-medium text-gray-700"
								>{m["login.email_label"]()}</Label
							>
							<Input
								id="email"
								type="email"
								bind:value={email}
								placeholder={m["login.email_placeholder"]()}
								class="h-12"
								disabled={isLoading}
								required
							/>
						</div>

						<!-- Password Field -->
						<div class="space-y-2">
							<Label for="password" class="text-sm font-medium text-gray-700"
								>{m["login.password_label"]()}</Label
							>
							<div class="relative">
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									bind:value={password}
									placeholder={m["login.password_placeholder"]()}
									class="h-12 pr-12"
									disabled={isLoading}
									required
								/>
								<button
									type="button"
									onclick={() => (showPassword = !showPassword)}
									class="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
									disabled={isLoading}
								>
									{#if showPassword}
										<EyeOff class="h-5 w-5" />
									{:else}
										<Eye class="h-5 w-5" />
									{/if}
								</button>
							</div>
						</div>

						<!-- Forgot Password -->
						<div class="flex justify-end">
							<a href="/forgot-password" class="text-sm text-cyan-600 hover:text-primary">
								{m["login.forgot_password"]()}
							</a>
						</div>

						<!-- Error Message -->
						{#if error}
							<div class="rounded-lg bg-red-50 p-3 text-center text-sm text-red-600">
								{error}
							</div>
						{/if}

						<!-- Login Button -->
						<Button
							type="submit"
							class="h-12 w-full bg-cyan-600 font-medium text-white hover:bg-primary"
							disabled={isLoading}
						>
							{#if isLoading}
								{m["login.logging_in"]()}
							{:else}
								{m["login.login_button"]()}
							{/if}
						</Button>
					</form>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</div>
