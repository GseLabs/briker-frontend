# RoutesCourierOnboardingStatusResponse

## Properties

| Name                    | Type    |
| ----------------------- | ------- |
| `canGenerateStripeLink` | boolean |
| `status`                | string  |
| `stripeAccountId`       | string  |
| `stripeActive`          | boolean |

## Example

```typescript
import type { RoutesCourierOnboardingStatusResponse } from "";

// TODO: Update the object below with actual values
const example = {
	canGenerateStripeLink: null,
	status: null,
	stripeAccountId: null,
	stripeActive: null
} satisfies RoutesCourierOnboardingStatusResponse;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RoutesCourierOnboardingStatusResponse;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
