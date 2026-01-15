<script lang="ts">
	import { page } from "$app/state";
	import { api } from "$lib/api";
	import * as m from "$lib/paraglide/messages";
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";

	import CircleCheck from "@lucide/svelte/icons/circle-check";
	import CircleX from "@lucide/svelte/icons/circle-x";
	import LoaderCircle from "@lucide/svelte/icons/loader-circle";

	let status: "loading" | "success" | "error" = $state("loading");

	$effect(() => {
		const verifyToken = async () => {
			const token = page.params.token;

			if (!token) {
				status = "error";
				return;
			}

			try {
				await api.verification.verificationVerifyEmailTokenGet({ token });
				status = "success";
			} catch (error: any) {
				status = "error";
			}
		};

		verifyToken();
	});
</script>

<svelte:head>
	<title>{m["verify_email.title"]()} - BRIKER</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center p-4">
	<div class="w-full max-w-md">
		<Card.Root class="border-0 shadow-lg">
			<Card.Title class="text-center text-2xl font-bold text-foreground">
				{m["verify_email.title"]()}
			</Card.Title>

			<Card.Content class="space-y-6 text-center">
				{#if status === "loading"}
					<div class="flex flex-col items-center space-y-4">
						<LoaderCircle class="h-12 w-12 animate-spin text-primary" />
						<p class="text-muted-foreground">{m["verify_email.checking"]()}</p>
					</div>
				{:else if status === "success"}
					<div class="space-y-4">
						<div
							class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
						>
							<CircleCheck class="h-8 w-8 text-green-600" />
						</div>
						<div class="space-y-2">
							<h2 class="text-xl font-semibold text-green-800">{m["verify_email.success"]()}</h2>
							<p class="text-muted-foreground">{m["verify_email.success_message"]()}</p>
						</div>
					</div>
				{:else}
					<div class="space-y-4">
						<div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
							<CircleX class="h-8 w-8 text-red-600" />
						</div>
						<div class="space-y-2">
							<h2 class="text-xl font-semibold text-red-800">{m["verify_email.error"]()}</h2>
							<p class="text-muted-foreground">{m["verify_email.error_message"]()}</p>
						</div>
						<Button href="/" variant="outline">
							{m["verify_email.back_home"]()}
						</Button>
					</div>
				{/if}
			</Card.Content>
		</Card.Root>
	</div>
</div>
