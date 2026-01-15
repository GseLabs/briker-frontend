<script lang="ts">
	import { m } from "$lib/paraglide/messages.js";
</script>

<section class="bg-background py-20">
	<div class="container mx-auto px-4">
		<div class="mb-16 space-y-4 text-center">
			<h2 class="text-4xl font-bold text-foreground md:text-5xl">
				{m["testimonials.title"]()}
			</h2>
		</div>

		<div class="flex items-center justify-center space-x-8">
			<div class="flex -space-x-4">
				<div
					class="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-primary/20"
				>
					<span class="text-lg">👤</span>
				</div>
				<div
					class="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-secondary/20"
				>
					<span class="text-lg">👤</span>
				</div>
				<div
					class="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-accent/20"
				>
					<span class="text-lg">👤</span>
				</div>
				<div
					class="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-primary/30"
				>
					<span class="text-lg">👤</span>
				</div>
			</div>

			<div class="max-w-lg space-y-4 text-center">
				<p class="text-lg text-muted-foreground italic">
					"BRIKER has transformed how we manage our delivery business. The platform is intuitive,
					reliable, and has helped us grow significantly."
				</p>
				<div class="space-y-1">
					<p class="font-semibold text-foreground">Sarah Johnson</p>
				</div>
			</div>
		</div>
	</div>
</section>
