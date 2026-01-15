# RoutesPublicVendorResponse

## Properties

| Name                     | Type                                                   |
| ------------------------ | ------------------------------------------------------ |
| `address`                | string                                                 |
| `businessDays`           | [Array&lt;SchemaBusinessDay&gt;](SchemaBusinessDay.md) |
| `businessName`           | string                                                 |
| `city`                   | string                                                 |
| `description`            | string                                                 |
| `id`                     | string                                                 |
| `latitude`               | number                                                 |
| `longitude`              | number                                                 |
| `minOrderAmount`         | number                                                 |
| `postalCode`             | string                                                 |
| `preparationTimeMinutes` | number                                                 |
| `totalProducts`          | number                                                 |

## Example

```typescript
import type { RoutesPublicVendorResponse } from "";

// TODO: Update the object below with actual values
const example = {
	address: null,
	businessDays: null,
	businessName: null,
	city: null,
	description: null,
	id: null,
	latitude: null,
	longitude: null,
	minOrderAmount: null,
	postalCode: null,
	preparationTimeMinutes: null,
	totalProducts: null
} satisfies RoutesPublicVendorResponse;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RoutesPublicVendorResponse;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
