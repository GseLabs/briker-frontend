<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { m } from "$lib/paraglide/messages.js";
</script>

<section class="bg-background py-20">
	<div class="container mx-auto px-4">
		<div class="mb-16 space-y-4 text-center">
			<h2 class="text-4xl font-bold text-foreground md:text-5xl">{m["earn_money.title"]()}</h2>
			<p class="mx-auto max-w-2xl text-lg text-muted-foreground">
				{m["earn_money.description"]()}
			</p>
		</div>

		<div class="space-y-12">
			<!-- Store Owner Section -->
			<div class="flex flex-col items-center space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
				<div class="lg:w-1/2">
					<div class="relative overflow-hidden rounded-2xl shadow-2xl">
						<img
							src="/img/landing/seller_header.png"
							alt="Store owner managing business"
							class="h-80 w-full object-cover"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
						<div class="absolute bottom-6 left-6">
							<Button
								href="/store-registration"
								class="bg-emerald-500 text-white hover:bg-emerald-600"
							>
								{m["earn_money.store_owner_button"]()}
							</Button>
						</div>
					</div>
				</div>
				<div class="space-y-6 text-center lg:w-1/2 lg:text-left">
					<div class="space-y-4">
						<div
							class="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700"
						>
							{m["earn_money.store_owner.badge"]()}
						</div>
						<h3 class="text-2xl font-bold text-foreground md:text-3xl">
							{m["earn_money.store_owner.title"]()}
						</h3>
					</div>
					<p class="text-lg text-muted-foreground">
						{m["earn_money.store_owner.description"]()}
					</p>
					<div class="space-y-3">
						<div class="flex items-center space-x-3">
							<div class="h-2 w-2 rounded-full bg-emerald-500"></div>
							<span class="text-foreground"
								>{m["earn_money.store_owner.features.management"]()}</span
							>
						</div>
						<div class="flex items-center space-x-3">
							<div class="h-2 w-2 rounded-full bg-emerald-500"></div>
							<span class="text-foreground">{m["earn_money.store_owner.features.analytics"]()}</span
							>
						</div>
						<div class="flex items-center space-x-3">
							<div class="h-2 w-2 rounded-full bg-emerald-500"></div>
							<span class="text-foreground"
								>{m["earn_money.store_owner.features.multichannel"]()}</span
							>
						</div>
					</div>
				</div>
			</div>

			<!-- Delivery Partner Section -->
			<div
				class="flex flex-col items-center space-y-8 lg:flex-row-reverse lg:space-y-0 lg:space-x-12 lg:space-x-reverse"
			>
				<div class="lg:w-1/2">
					<div class="relative overflow-hidden rounded-2xl shadow-2xl">
						<img
							src="/img/landing/deliveryman_header.png"
							alt="Delivery partner on motorcycle"
							class="h-80 w-full object-cover"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
						<div class="absolute bottom-6 left-6">
							<Button
								href="/deliveryman-registration"
								class="bg-primary text-primary-foreground hover:bg-primary/90"
							>
								{m["earn_money.delivery_partner_button"]()}
							</Button>
						</div>
					</div>
				</div>
				<div class="space-y-6 text-center lg:w-1/2 lg:text-left">
					<div class="space-y-4">
						<div
							class="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
						>
							{m["earn_money.delivery_partner.badge"]()}
						</div>
						<h3 class="text-2xl font-bold text-foreground md:text-3xl">
							{m["earn_money.delivery_partner.title"]()}
						</h3>
					</div>
					<p class="text-lg text-muted-foreground">
						{m["earn_money.delivery_partner.description"]()}
					</p>
					<div class="space-y-3">
						<div class="flex items-center space-x-3">
							<div class="h-2 w-2 rounded-full bg-primary"></div>
							<span class="text-foreground"
								>{m["earn_money.delivery_partner.features.flexible"]()}</span
							>
						</div>
						<div class="flex items-center space-x-3">
							<div class="h-2 w-2 rounded-full bg-primary"></div>
							<span class="text-foreground"
								>{m["earn_money.delivery_partner.features.rates"]()}</span
							>
						</div>
						<div class="flex items-center space-x-3">
							<div class="h-2 w-2 rounded-full bg-primary"></div>
							<span class="text-foreground"
								>{m["earn_money.delivery_partner.features.payments"]()}</span
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
