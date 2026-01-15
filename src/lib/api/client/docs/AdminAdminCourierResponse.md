# AdminAdminCourierResponse

## Properties

| Name              | Type                                                         |
| ----------------- | ------------------------------------------------------------ |
| `createdAt`       | string                                                       |
| `documents`       | [Array&lt;AdminCourierDocument&gt;](AdminCourierDocument.md) |
| `email`           | string                                                       |
| `emailVerified`   | boolean                                                      |
| `firstName`       | string                                                       |
| `id`              | string                                                       |
| `lastLogin`       | string                                                       |
| `lastName`        | string                                                       |
| `phone`           | string                                                       |
| `phoneVerified`   | boolean                                                      |
| `status`          | [CourierprofileStatus](CourierprofileStatus.md)              |
| `stripeAccountId` | string                                                       |
| `stripeActive`    | boolean                                                      |
| `updatedAt`       | string                                                       |
| `vehicleType`     | [AdminVehicleTypeResponse](AdminVehicleTypeResponse.md)      |

## Example

```typescript
import type { AdminAdminCourierResponse } from "";

// TODO: Update the object below with actual values
const example = {
	createdAt: null,
	documents: null,
	email: null,
	emailVerified: null,
	firstName: null,
	id: null,
	lastLogin: null,
	lastName: null,
	phone: null,
	phoneVerified: null,
	status: null,
	stripeAccountId: null,
	stripeActive: null,
	updatedAt: null,
	vehicleType: null
} satisfies AdminAdminCourierResponse;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AdminAdminCourierResponse;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
