<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { config } from "$lib/config/config";
	import { m } from "$lib/paraglide/messages.js";

	import MapPin from "@lucide/svelte/icons/map-pin";
	import Mail from "@lucide/svelte/icons/mail";
	import Phone from "@lucide/svelte/icons/phone";
</script>

<footer class="relative overflow-hidden bg-primary text-white">
	<div
		class="absolute top-0 left-0 h-32 w-64 -translate-x-32 -translate-y-16 -skew-x-12 transform bg-footer/20"
	></div>
	<div
		class="absolute top-0 right-0 h-32 w-64 translate-x-32 -translate-y-16 skew-x-12 transform bg-footer/20"
	></div>

	<div class="relative container mx-auto px-4 py-16">
		<div class="mb-12 grid grid-cols-1 gap-12 md:grid-cols-3">
			<div class="space-y-6">
				<div class="flex h-12 w-24 items-center justify-center rounded-lg">
					<img src="/img/logo_long.webp" alt="BRIKER" class="h-8 w-auto" />
				</div>
				<p class="max-w-sm text-sm leading-relaxed text-white/90">
					{m["footer.description"]()}
				</p>
				<div class="space-y-4">
					<div class="flex space-x-4">
						<a
							href={config.apps.googlePlay}
							class="inline-block"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src="/img/landing/google_play.svg"
								alt="Get it on Google Play"
								class="h-12 w-auto"
							/>
						</a>
						<a
							href={config.apps.appStore}
							class="inline-block"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src="/img/landing/app_store.svg"
								alt="Download on the App Store"
								class="h-12 w-auto"
							/>
						</a>
					</div>

					<!-- Newsletter inline -->
					<!-- TODO: Implement newsletter subscription with a component
					<div
						class="flex max-w-xs gap-2 rounded-lg border border-white/20 bg-white/10 p-1 backdrop-blur-sm"
					>
						<input
							type="email"
							placeholder={m["footer.newsletter_email"]()}
							class="flex-1 border-0 bg-transparent px-3 py-2 text-sm text-white placeholder-white/60 focus:ring-0 focus:outline-none"
						/>
						<Button
							class="rounded-md bg-white px-3 py-2 text-sm font-medium whitespace-nowrap text-footer hover:bg-white/90"
						>
							{m["footer.newsletter_button"]()}
						</Button>
					</div>
					-->
				</div>
			</div>

			<!-- Support -->
			<div class="space-y-6">
				<h3 class="text-lg font-semibold text-white">{m["footer.support"]()}</h3>
				<div class="space-y-3 text-sm">
					<a href="/privacy" class="block transition-colors hover:text-white/80"
						>{m["nav.privacy"]()}</a
					>
					<a href="/terms" class="block transition-colors hover:text-white/80">{m["nav.terms"]()}</a
					>
					<a href="/refund" class="block transition-colors hover:text-white/80"
						>{m["nav.refund_policy"]()}</a
					>
				</div>
			</div>

			<!-- Contact Us -->
			<div class="space-y-6">
				<h3 class="text-lg font-semibold text-white">{m["footer.contact_us"]()}</h3>
				<div class="space-y-4 text-sm">
					<div class="flex items-start space-x-3">
						<div class="mt-0.5 h-5 w-5 flex-shrink-0">
							<MapPin class="h-full w-full" />
						</div>
						<span class="text-white/90">{config.address.split(", ")[1]}</span>
					</div>
					<div class="flex items-start space-x-3">
						<div class="mt-0.5 h-5 w-5 flex-shrink-0">
							<Mail class="h-full w-full" />
						</div>
						<a
							href="mailto:{config.email.contact}"
							class="cursor-pointer text-white/90 transition-all duration-200 hover:text-white hover:underline"
						>
							{config.email.contact}
						</a>
					</div>
					<div class="flex items-start space-x-3">
						<div class="mt-0.5 h-5 w-5 flex-shrink-0">
							<Phone class="h-full w-full" />
						</div>
						<a
							href="tel:{config.phone}"
							class="cursor-pointer text-white/90 transition-all duration-200 hover:text-white hover:underline"
						>
							{config.phone}
						</a>
					</div>
				</div>
			</div>
		</div>

		<div class="border-t border-white/20 pt-8">
			<div class="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
				<p class="text-sm text-white/70">
					{m["footer.copyright"]({ year: new Date().getFullYear() })}
				</p>
			</div>
		</div>
	</div>
</footer>
