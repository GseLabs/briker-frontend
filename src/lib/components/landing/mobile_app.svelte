<script lang="ts">
	import { m } from "$lib/paraglide/messages.js";
</script>

<section class="my-20 bg-background">
	<div class="container mx-auto px-4">
		<div
			class="flex flex-col items-center justify-between space-y-12 lg:flex-row lg:space-y-0 lg:space-x-16"
		>
			<div class="space-y-6 text-center lg:w-1/2 lg:text-left">
				<h2 class="text-3xl leading-tight font-bold text-foreground md:text-4xl lg:text-5xl">
					{m["mobile_app.title"]()}
				</h2>
				<p class="max-w-lg text-lg text-muted-foreground">
					{m["mobile_app.description"]()}
				</p>
				<div class="space-y-4">
					<div class="flex items-center justify-center space-x-3 lg:justify-start">
						<div class="h-2 w-2 rounded-full bg-primary"></div>
						<span class="text-sm text-foreground">{m["mobile_app.features.tracking"]()}</span>
					</div>
					<div class="flex items-center justify-center space-x-3 lg:justify-start">
						<div class="h-2 w-2 rounded-full bg-primary"></div>
						<span class="text-sm text-foreground">{m["mobile_app.features.payments"]()}</span>
					</div>
					<div class="flex items-center justify-center space-x-3 lg:justify-start">
						<div class="h-2 w-2 rounded-full bg-primary"></div>
						<span class="text-sm text-foreground">{m["mobile_app.features.multilanguage"]()}</span>
					</div>
				</div>
			</div>

			<div class="flex justify-center lg:w-1/2">
				<div class="relative">
					<div class="h-[500px] w-64 rounded-[2.5rem] bg-black p-2 shadow-2xl">
						<div class="h-full w-full overflow-hidden rounded-[2rem] bg-white">
							<div
								class="flex h-full flex-col bg-gradient-to-br from-primary/5 via-white to-accent/5"
							>
								<div class="flex flex-1 flex-col items-center justify-center space-y-6 p-6">
									<div class="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
										<img src="/img/logo_long.webp" alt="Briker" class="h-auto w-16" />
									</div>
									<div class="w-full space-y-4">
										<div class="flex items-center space-x-3 rounded-lg bg-white/80 p-3">
											<div class="h-8 w-8 rounded-full bg-primary/20"></div>
											<div class="flex-1">
												<div class="h-2 w-3/4 rounded bg-muted"></div>
												<div class="mt-1 h-1.5 w-1/2 rounded bg-muted/60"></div>
											</div>
										</div>
										<div class="flex items-center space-x-3 rounded-lg bg-white/80 p-3">
											<div class="h-8 w-8 rounded-full bg-secondary/30"></div>
											<div class="flex-1">
												<div class="h-2 w-2/3 rounded bg-muted"></div>
												<div class="mt-1 h-1.5 w-3/4 rounded bg-muted/60"></div>
											</div>
										</div>
										<div class="flex items-center space-x-3 rounded-lg bg-white/80 p-3">
											<div class="h-8 w-8 rounded-full bg-accent/40"></div>
											<div class="flex-1">
												<div class="h-2 w-4/5 rounded bg-muted"></div>
												<div class="mt-1 h-1.5 w-1/3 rounded bg-muted/60"></div>
											</div>
										</div>
									</div>
									<div class="flex h-12 w-full items-center justify-center rounded-lg bg-primary">
										<span class="text-sm font-medium text-primary-foreground"
											>{m["mobile_app.get_started"]()}</span
										>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-primary/20 blur-xl"></div>
					<div
						class="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-secondary/20 blur-xl"
					></div>
				</div>
			</div>
		</div>
	</div>
</section>
