<script lang="ts">
	import { config } from "$lib/config/config";
	import { m } from "$lib/paraglide/messages.js";
</script>

<svelte:head>
	<title>{m["about.title"]()} - Briker</title>
	<meta name="description" content={m["about.meta_description"]()} />
</svelte:head>

<div class="min-h-screen bg-background py-16">
	<div class="container mx-auto max-w-4xl px-4">
		<!-- Illustration en haut -->
		<div class="mb-12 flex justify-center">
			<div class="relative">
				<img
					src="/img/landing/conversation.svg"
					alt="Équipe Briker en conversation"
					class="h-auto max-h-80 w-full"
				/>
			</div>
		</div>

		<!-- Contenu textuel à la suite -->
		<div class="space-y-8">
			<!-- Main Title -->
			<div class="text-center">
				<h1 class="mb-8 text-4xl font-bold text-foreground lg:text-5xl">
					{m["about.main_title"]()}
				</h1>
			</div>

			<!-- Content Sections -->
			<div class="space-y-8 leading-relaxed text-foreground">
				<p class="text-lg">
					{m["about.intro_content"]()}
				</p>

				<p class="text-lg">
					{m["about.security_content"]()}
				</p>

				<div>
					<h2 class="mb-4 text-3xl font-bold text-foreground">{m["about.mission_title"]()}</h2>
					<p class="text-lg">
						{m["about.mission_content"]()}
					</p>
				</div>

				<div>
					<h2 class="mb-4 text-3xl font-bold text-foreground">{m["about.services_title"]()}</h2>
					<p class="text-lg">
						{m["about.services_content"]()}
					</p>
				</div>

				<div>
					<h2 class="mb-4 text-3xl font-bold text-foreground">{m["about.commitments_title"]()}</h2>
					<p class="text-lg">
						{m["about.commitments_content"]()}
					</p>
				</div>

				<div>
					<h2 class="mb-4 text-3xl font-bold text-foreground">{m["about.values_title"]()}</h2>
					<p class="text-lg">
						{m["about.values_content"]()}
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
