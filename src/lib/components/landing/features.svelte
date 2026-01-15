<script lang="ts">
	import Truck from "@lucide/svelte/icons/truck";
	import Package from "@lucide/svelte/icons/package";
	import Clock from "@lucide/svelte/icons/clock";
	import { m } from "$lib/paraglide/messages.js";
</script>

<section class="bg-muted py-16">
	<div class="container mx-auto px-4">
		<div class="flex items-center justify-center space-x-12 lg:space-x-24">
			<div class="flex flex-col items-center space-y-2 text-center">
				<div class="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
					<Truck class="h-8 w-8 text-primary" />
				</div>
				<h3 class="text-sm font-medium text-foreground">{m["features.fast_delivery.title"]()}</h3>
				<p class="max-w-24 text-xs text-muted-foreground">
					{m["features.fast_delivery.description"]()}
				</p>
			</div>

			<div class="flex flex-col items-center space-y-1 text-center">
				<div class="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
					<Package class="h-8 w-8 text-primary" />
				</div>
				<h3 class="text-sm font-medium text-foreground">{m["features.secure_package.title"]()}</h3>
				<p class="max-w-24 text-xs text-muted-foreground">
					{m["features.secure_package.description"]()}
				</p>
			</div>

			<div class="flex flex-col items-center space-y-2 text-center">
				<div class="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
					<Clock class="h-8 w-8 text-primary" />
				</div>
				<h3 class="text-sm font-medium text-foreground">{m["features.support_24_7.title"]()}</h3>
				<p class="max-w-24 text-xs text-muted-foreground">
					{m["features.support_24_7.description"]()}
				</p>
			</div>
		</div>
	</div>
</section>
