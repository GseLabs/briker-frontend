# AdminAdminVendorResponse

## Properties

| Name                     | Type                                                       |
| ------------------------ | ---------------------------------------------------------- |
| `address`                | string                                                     |
| `businessDays`           | Array&lt;object&gt;                                        |
| `businessName`           | string                                                     |
| `city`                   | string                                                     |
| `createdAt`              | string                                                     |
| `description`            | string                                                     |
| `documents`              | [Array&lt;AdminVendorDocument&gt;](AdminVendorDocument.md) |
| `email`                  | string                                                     |
| `emailVerified`          | boolean                                                    |
| `firstName`              | string                                                     |
| `id`                     | string                                                     |
| `lastLogin`              | string                                                     |
| `lastName`               | string                                                     |
| `latitude`               | number                                                     |
| `longitude`              | number                                                     |
| `minOrderAmount`         | number                                                     |
| `phone`                  | string                                                     |
| `phoneVerified`          | boolean                                                    |
| `postalCode`             | string                                                     |
| `preparationTimeMinutes` | number                                                     |
| `siret`                  | string                                                     |
| `status`                 | [VendorprofileStatus](VendorprofileStatus.md)              |
| `stripeAccountId`        | string                                                     |
| `stripeActive`           | boolean                                                    |
| `timezone`               | string                                                     |
| `updatedAt`              | string                                                     |

## Example

```typescript
import type { AdminAdminVendorResponse } from "";

// TODO: Update the object below with actual values
const example = {
	address: null,
	businessDays: null,
	businessName: null,
	city: null,
	createdAt: null,
	description: null,
	documents: null,
	email: null,
	emailVerified: null,
	firstName: null,
	id: null,
	lastLogin: null,
	lastName: null,
	latitude: null,
	longitude: null,
	minOrderAmount: null,
	phone: null,
	phoneVerified: null,
	postalCode: null,
	preparationTimeMinutes: null,
	siret: null,
	status: null,
	stripeAccountId: null,
	stripeActive: null,
	timezone: null,
	updatedAt: null
} satisfies AdminAdminVendorResponse;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AdminAdminVendorResponse;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
