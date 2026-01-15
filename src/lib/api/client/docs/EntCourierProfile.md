# EntCourierProfile

## Properties

| Name                      | Type                                                |
| ------------------------- | --------------------------------------------------- |
| `attestationDate`         | string                                              |
| `attestationIp`           | string                                              |
| `attestationText`         | string                                              |
| `createdAt`               | string                                              |
| `driverLicenseS3`         | string                                              |
| `edges`                   | [EntCourierProfileEdges](EntCourierProfileEdges.md) |
| `id`                      | string                                              |
| `professionalLiabilityS3` | string                                              |
| `status`                  | [CourierprofileStatus](CourierprofileStatus.md)     |
| `stripeAccountId`         | string                                              |
| `stripeActive`            | boolean                                             |
| `transportLicenseS3`      | string                                              |
| `updatedAt`               | string                                              |
| `userId`                  | string                                              |
| `vehicleInspectionS3`     | string                                              |
| `vehicleInsuranceS3`      | string                                              |
| `vehicleRegistrationS3`   | string                                              |
| `vehicleTypeId`           | number                                              |

## Example

```typescript
import type { EntCourierProfile } from "";

// TODO: Update the object below with actual values
const example = {
	attestationDate: null,
	attestationIp: null,
	attestationText: null,
	createdAt: null,
	driverLicenseS3: null,
	edges: null,
	id: null,
	professionalLiabilityS3: null,
	status: null,
	stripeAccountId: null,
	stripeActive: null,
	transportLicenseS3: null,
	updatedAt: null,
	userId: null,
	vehicleInspectionS3: null,
	vehicleInsuranceS3: null,
	vehicleRegistrationS3: null,
	vehicleTypeId: null
} satisfies EntCourierProfile;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EntCourierProfile;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
