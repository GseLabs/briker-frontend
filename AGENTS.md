# Briker Frontend - API

## Adding New APIs

When new APIs are generated:

1. Import the new API class from `./client`
2. Create a new instance with `apiConfig` in `stores.ts`
3. Export it from `stores.ts` (automatically available via `index.ts`)

## Benefits

1. **Automatic cookies**: No need to manually manage access tokens
2. **Centralized configuration**: Single source of truth for API config
3. **Type safety**: Full typing thanks to OpenAPI generation
4. **Svelte reactivity**: Reactive store for authentication state
5. **SSR compatible**: Automatic browser/server detection
6. **Extensible**: Easy to add new APIs as they are generated

## Paraglide Translations

This project uses Paraglide for internationalization with auto-generated message functions.

### Translation Structure

- Source files: `messages/en.json` and `messages/fr.json`
- Generated functions: `src/lib/paraglide/messages/`
- Import: `import * as m from '$lib/paraglide/messages'`

### Adding New Translations

1. Add new message keys to `messages/en.json` and `messages/fr.json`
2. Paraglide will auto-generate the corresponding functions
3. Use in components: `{m.your_message_key()}`

### Example Usage

```svelte
<script>
	import * as m from "$lib/paraglide/messages";
</script>

<h1>{m.verify_email_title()}</h1><p>{m.verify_email_success_message()}</p>
```

### Complex Keys

For keys with special characters or complex names, use bracket notation:

```svelte
<script>
	import * as m from "$lib/paraglide/messages";
</script>

<p>{m["login_error_required"]()}</p><p>{m["contact_form_send"]()}</p>
```

**Note**: The verification success page shows a message indicating the user can close the page, as redirection will be handled by the auth flow in the main app.

**Note**: Always edit the JSON files in `messages/`, not the auto-generated JS files in `src/lib/paraglide/messages/`.

## Code Style

### Svelte Version

Always use Svelte 5 syntax in RUNE MODE (not legacy, IMPORTANT).

- Use `let { prop1, prop2 } = $props()` instead of `export let prop1, prop2`
- Use `$state()` instead of `let` for reactive variables
- Use `$derived()` for computed values instead of `$:`
- Use `$effect()` instead of `$:` for side effects

### Comments

Do not add comments, every comments, even useful ones, are a sign of bad code. Write self-explanatory code instead.

## Shadcn-svelte Components

This project uses shadcn-svelte for UI components.

### Available Components

Check `src/lib/components/ui/` for installed components.

### Form Handling

Use Formisch for advanced form validation and handling:

```svelte
<script lang="ts">
	import { createForm, Field, Form } from "@formisch/svelte";
	import * as v from "valibot";

	const LoginSchema = v.object({
		email: v.pipe(v.string(), v.email()),
		password: v.pipe(v.string(), v.minLength(8))
	});

	const loginForm = createForm({ schema: LoginSchema });
</script>

<Form of={loginForm} onsubmit={(output) => console.log(output)}>
	<Field of={loginForm} path={["email"]}>
		{#snippet children(field)}
			<div>
				<input {...field.props} value={field.input} type="email" />
				{#if field.errors}
					<div>{field.errors[0]}</div>
				{/if}
			</div>
		{/snippet}
	</Field>
	<Field of={loginForm} path={["password"]}>
		{#snippet children(field)}
			<div>
				<input {...field.props} value={field.input} type="password" />
				{#if field.errors}
					<div>{field.errors[0]}</div>
				{/if}
			</div>
		{/snippet}
	</Field>
	<button type="submit">Login</button>
</Form>
```

For simple forms without complex validation, manual handling is acceptable.

### Import Pattern

For components with multiple parts, use namespace imports:

```svelte
<script>
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Title</Card.Title>
	</Card.Header>
	<Card.Content>Content here</Card.Content>
</Card.Root>
```

### Icons

Always use `@lucide/svelte` icons instead of inline SVGs:

```svelte
<script>
	import CircleCheck from "@lucide/svelte/icons/circle-check.svelte";
	import CircleX from "@lucide/svelte/icons/circle-x.svelte";
	import LoaderCircle from "@lucide/svelte/icons/loader-circle.svelte";
</script>

<CircleCheck class="h-6 w-6 text-green-600" />
```

### Design Tokens

Use design system classes for consistency:

- Colors: `bg-primary`, `text-secondary`, etc.
- Spacing: `p-4`, `m-2`, etc.
- Typography: `text-lg`, `font-medium`, etc.
  Refer to `src/app.css` for available tokens.

### Behavioral Components

- Never try to modify shadcn-svelte components to add behavior (e.g., loading states, conditional rendering). Always wrap them in your own components to add such behavior.
- Never do git commands to push changes. The user will always do that manually.
- Never svelte-check or build the project locally. The user will always do that manually.
