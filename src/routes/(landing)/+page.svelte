<script>
	import {
		Header,
		Features,
		MobileApp,
		Services,
		EarnMoney,
		Statistics,
		Testimonials
	} from "$lib/components/landing/index";
	import { m } from "$lib/paraglide/messages.js";
</script>

<svelte:head>
	<title>{m["home.title"]()}</title>
	<meta name="description" content={m["home.meta_description"]()} />
</svelte:head>

<Header />
<Features />
<MobileApp />
<Services />
<EarnMoney />
<Statistics />
<Testimonials />
