# RoutesVendorRegistrationRequest

## Properties

| Name                     | Type                                                   |
| ------------------------ | ------------------------------------------------------ |
| `address`                | string                                                 |
| `businessDays`           | [Array&lt;SchemaBusinessDay&gt;](SchemaBusinessDay.md) |
| `businessName`           | string                                                 |
| `city`                   | string                                                 |
| `confirmPassword`        | string                                                 |
| `description`            | string                                                 |
| `email`                  | string                                                 |
| `firstName`              | string                                                 |
| `identityCard`           | string                                                 |
| `insurance`              | string                                                 |
| `kbis`                   | string                                                 |
| `lastName`               | string                                                 |
| `minOrderAmount`         | number                                                 |
| `password`               | string                                                 |
| `phone`                  | string                                                 |
| `postalCode`             | string                                                 |
| `preparationTimeMinutes` | number                                                 |
| `siret`                  | string                                                 |
| `timezone`               | string                                                 |

## Example

```typescript
import type { RoutesVendorRegistrationRequest } from "";

// TODO: Update the object below with actual values
const example = {
	address: null,
	businessDays: null,
	businessName: null,
	city: null,
	confirmPassword: null,
	description: null,
	email: null,
	firstName: null,
	identityCard: null,
	insurance: null,
	kbis: null,
	lastName: null,
	minOrderAmount: null,
	password: null,
	phone: null,
	postalCode: null,
	preparationTimeMinutes: null,
	siret: null,
	timezone: null
} satisfies RoutesVendorRegistrationRequest;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RoutesVendorRegistrationRequest;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
