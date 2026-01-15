# RoutesCourierRegistrationRequest

## Properties

| Name                    | Type    |
| ----------------------- | ------- |
| `attestation`           | boolean |
| `city`                  | string  |
| `confirmPassword`       | string  |
| `driverLicense`         | string  |
| `email`                 | string  |
| `firstName`             | string  |
| `lastName`              | string  |
| `password`              | string  |
| `phone`                 | string  |
| `postalCode`            | string  |
| `professionalLiability` | string  |
| `technicalInspection`   | string  |
| `transportLicense`      | string  |
| `vehicleInsurance`      | string  |
| `vehicleModel`          | string  |
| `vehicleRegistration`   | string  |
| `vehicleType`           | number  |

## Example

```typescript
import type { RoutesCourierRegistrationRequest } from "";

// TODO: Update the object below with actual values
const example = {
	attestation: null,
	city: null,
	confirmPassword: null,
	driverLicense: null,
	email: null,
	firstName: null,
	lastName: null,
	password: null,
	phone: null,
	postalCode: null,
	professionalLiability: null,
	technicalInspection: null,
	transportLicense: null,
	vehicleInsurance: null,
	vehicleModel: null,
	vehicleRegistration: null,
	vehicleType: null
} satisfies RoutesCourierRegistrationRequest;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RoutesCourierRegistrationRequest;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
