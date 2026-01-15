<script lang="ts">
	import { m } from "$lib/paraglide/messages.js";
</script>

<section
	class="relative flex min-h-[50vh] items-center justify-center overflow-hidden md:min-h-[85vh]"
>
	<div class="bg-grid-pattern absolute inset-0 opacity-5"></div>

	<div class="container mx-auto px-4 py-16">
		<div class="mx-auto flex max-w-4xl flex-col items-center space-y-6 text-center">
			<h1 class="text-3xl leading-tight font-bold text-foreground md:text-5xl lg:text-6xl">
				{m["header.main_title"]()}
			</h1>

			<div class="flex items-center justify-center">
				<img src="/img/logo_long.webp" alt="BRIKER" class="h-12 w-auto md:h-16 lg:h-18" />
			</div>

			<p class="md:text-md max-w-xl text-base text-black/60">
				{m["header.description"]()}
			</p>

			<div class="relative mx-auto -mt-16 w-full max-w-2xl">
				<img
					src="/img/landing/delivery_header.svg"
					alt="Delivery and logistics illustration"
					class="h-auto w-full"
				/>
			</div>
		</div>
	</div>
</section>
