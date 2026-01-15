# EntVendorProfile

## Properties

| Name                     | Type                                                   |
| ------------------------ | ------------------------------------------------------ |
| `address`                | string                                                 |
| `businessDays`           | [Array&lt;SchemaBusinessDay&gt;](SchemaBusinessDay.md) |
| `businessName`           | string                                                 |
| `city`                   | string                                                 |
| `createdAt`              | string                                                 |
| `description`            | string                                                 |
| `edges`                  | [EntVendorProfileEdges](EntVendorProfileEdges.md)      |
| `id`                     | string                                                 |
| `identityCardS3`         | string                                                 |
| `insuranceS3`            | string                                                 |
| `kbisS3`                 | string                                                 |
| `latitude`               | number                                                 |
| `longitude`              | number                                                 |
| `minOrderAmount`         | number                                                 |
| `postalCode`             | string                                                 |
| `preparationTimeMinutes` | number                                                 |
| `siret`                  | string                                                 |
| `status`                 | [VendorprofileStatus](VendorprofileStatus.md)          |
| `stripeAccountId`        | string                                                 |
| `stripeActive`           | boolean                                                |
| `timezone`               | string                                                 |
| `updatedAt`              | string                                                 |
| `userId`                 | string                                                 |

## Example

```typescript
import type { EntVendorProfile } from "";

// TODO: Update the object below with actual values
const example = {
	address: null,
	businessDays: null,
	businessName: null,
	city: null,
	createdAt: null,
	description: null,
	edges: null,
	id: null,
	identityCardS3: null,
	insuranceS3: null,
	kbisS3: null,
	latitude: null,
	longitude: null,
	minOrderAmount: null,
	postalCode: null,
	preparationTimeMinutes: null,
	siret: null,
	status: null,
	stripeAccountId: null,
	stripeActive: null,
	timezone: null,
	updatedAt: null,
	userId: null
} satisfies EntVendorProfile;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EntVendorProfile;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
