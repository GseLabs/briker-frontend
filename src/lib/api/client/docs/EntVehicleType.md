# EntVehicleType

## Properties

| Name             | Type                                          |
| ---------------- | --------------------------------------------- |
| `edges`          | [EntVehicleTypeEdges](EntVehicleTypeEdges.md) |
| `id`             | number                                        |
| `label`          | string                                        |
| `maxDistanceKm`  | number                                        |
| `maxHeightCm`    | number                                        |
| `maxLengthCm`    | number                                        |
| `maxWeightKg`    | number                                        |
| `maxWidthCm`     | number                                        |
| `needsDocuments` | boolean                                       |

## Example

```typescript
import type { EntVehicleType } from "";

// TODO: Update the object below with actual values
const example = {
	edges: null,
	id: null,
	label: null,
	maxDistanceKm: null,
	maxHeightCm: null,
	maxLengthCm: null,
	maxWeightKg: null,
	maxWidthCm: null,
	needsDocuments: null
} satisfies EntVehicleType;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EntVehicleType;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
