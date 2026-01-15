<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from "$lib/components/ui/card/index.js";
	import Store from "@lucide/svelte/icons/store";
	import Smartphone from "@lucide/svelte/icons/smartphone";
	import CreditCard from "@lucide/svelte/icons/credit-card";
	import Users from "@lucide/svelte/icons/users";
	import { m } from "$lib/paraglide/messages.js";
</script>

<section class="relative overflow-hidden bg-muted py-20">
	<div class="absolute inset-0">
		<div class="absolute top-10 left-10 h-32 w-32 rounded-full bg-primary/5 blur-3xl"></div>
		<div class="absolute right-10 bottom-10 h-40 w-40 rounded-full bg-secondary/10 blur-3xl"></div>
		<div class="absolute top-1/2 left-1/4 h-24 w-24 rounded-full bg-accent/5 blur-2xl"></div>
	</div>

	<div class="relative container mx-auto px-4">
		<div class="mb-16 space-y-4 text-center">
			<h2 class="text-4xl font-bold text-foreground md:text-5xl">
				{@html m["services.main_title"]()}
			</h2>
			<p class="mx-auto max-w-2xl text-lg text-muted-foreground">
				{m["services.description"]()}
			</p>
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
			<Card
				class="group flex cursor-pointer flex-col items-center border-0 bg-white/80 text-center backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
			>
				<CardHeader class="flex flex-col items-center justify-center">
					<div
						class="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg transition-all duration-300 group-hover:shadow-emerald-200/50"
					>
						<Store class="h-12 w-12 text-white" />
					</div>
				</CardHeader>
				<CardContent class="space-y-2 pb-6 text-center">
					<CardTitle
						class="text-xl font-bold text-foreground transition-colors group-hover:text-emerald-600"
						>{m["services.merchant_portal.title"]()}</CardTitle
					>
					<CardDescription class="text-sm leading-relaxed">
						{m["services.merchant_portal.description"]()}
					</CardDescription>
				</CardContent>
			</Card>

			<Card
				class="group flex cursor-pointer flex-col items-center border-0 bg-white/80 text-center backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
			>
				<CardHeader class="flex flex-col items-center justify-center">
					<div
						class="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg transition-all duration-300 group-hover:shadow-purple-200/50"
					>
						<Smartphone class="h-12 w-12 text-white" />
					</div>
				</CardHeader>
				<CardContent class="space-y-2 pb-6 text-center">
					<CardTitle
						class="text-xl font-bold text-foreground transition-colors group-hover:text-purple-600"
						>{m["services.mobile_app.title"]()}</CardTitle
					>
					<CardDescription class="text-sm leading-relaxed">
						{m["services.mobile_app.description"]()}
					</CardDescription>
				</CardContent>
			</Card>

			<Card
				class="group flex cursor-pointer flex-col items-center border-0 bg-white/80 text-center backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
			>
				<CardHeader class="flex flex-col items-center justify-center">
					<div
						class="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg transition-all duration-300 group-hover:shadow-blue-200/50"
					>
						<CreditCard class="h-12 w-12 text-white" />
					</div>
				</CardHeader>
				<CardContent class="space-y-2 pb-6 text-center">
					<CardTitle
						class="text-xl font-bold text-foreground transition-colors group-hover:text-blue-600"
						>{m["services.secure_payments.title"]()}</CardTitle
					>
					<CardDescription class="text-sm leading-relaxed">
						{m["services.secure_payments.description"]()}
					</CardDescription>
				</CardContent>
			</Card>

			<Card
				class="group flex cursor-pointer flex-col items-center border-0 bg-white/80 text-center backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
			>
				<CardHeader class="flex flex-col items-center justify-center">
					<div
						class="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg transition-all duration-300 group-hover:shadow-primary/30"
					>
						<Users class="h-12 w-12 text-white" />
					</div>
				</CardHeader>
				<CardContent class="space-y-2 pb-6 text-center">
					<CardTitle
						class="text-xl font-bold text-foreground transition-colors group-hover:text-primary"
						>{m["services.community_hub.title"]()}</CardTitle
					>
					<CardDescription class="text-sm leading-relaxed">
						{m["services.community_hub.description"]()}
					</CardDescription>
				</CardContent>
			</Card>
		</div>
	</div>
</section>
