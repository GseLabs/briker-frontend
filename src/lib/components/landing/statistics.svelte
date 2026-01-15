<script lang="ts">
	import { m } from "$lib/paraglide/messages.js";
</script>

<section class="bg-muted py-16">
	<div class="container mx-auto px-4">
		<div class="space-y-8">
			<div class="space-y-4 text-center">
				<h2 class="text-3xl font-bold text-foreground md:text-4xl">
					{m["statistics.title"]()}
				</h2>
				<p class="mx-auto max-w-lg text-muted-foreground">
					{m["statistics.description"]()}
				</p>
			</div>

			<div class="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
				<div class="text-center">
					<div class="mb-2 text-2xl font-bold text-primary md:text-4xl">1:1</div>
					<p class="text-xs text-muted-foreground md:text-sm">{m["statistics.perfect_ratio"]()}</p>
				</div>

				<div class="text-center">
					<div class="mb-2 text-2xl font-bold text-primary md:text-4xl">24/7</div>
					<p class="text-xs text-muted-foreground md:text-sm">{m["statistics.support"]()}</p>
					<p class="hidden text-xs text-muted-foreground md:block">
						{m["statistics.support_extended"]()}
					</p>
				</div>

				<div class="text-center">
					<div class="mb-2 text-2xl font-bold text-primary md:text-4xl">99%</div>
					<p class="text-xs text-muted-foreground md:text-sm">{m["statistics.satisfaction"]()}</p>
					<p class="hidden text-xs text-muted-foreground md:block">
						{m["statistics.satisfaction_extended"]()}
					</p>
				</div>

				<div class="text-center">
					<div class="mb-2 text-2xl font-bold text-primary md:text-4xl">50K+</div>
					<p class="text-xs text-muted-foreground md:text-sm">{m["statistics.active_users"]()}</p>
					<p class="hidden text-xs text-muted-foreground md:block">
						{m["statistics.active_users_extended"]()}
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
