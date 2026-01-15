# RoutesPublicVehicleTypeResponse

## Properties

| Name             | Type    |
| ---------------- | ------- |
| `id`             | number  |
| `label`          | string  |
| `maxDistanceKm`  | number  |
| `maxHeightCm`    | number  |
| `maxLengthCm`    | number  |
| `maxWeightKg`    | number  |
| `maxWidthCm`     | number  |
| `needsDocuments` | boolean |

## Example

```typescript
import type { RoutesPublicVehicleTypeResponse } from "";

// TODO: Update the object below with actual values
const example = {
	id: null,
	label: null,
	maxDistanceKm: null,
	maxHeightCm: null,
	maxLengthCm: null,
	maxWeightKg: null,
	maxWidthCm: null,
	needsDocuments: null
} satisfies RoutesPublicVehicleTypeResponse;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RoutesPublicVehicleTypeResponse;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
