# EntUserEdges

## Properties

| Name             | Type                                      |
| ---------------- | ----------------------------------------- |
| `clientProfile`  | [EntClientProfile](EntClientProfile.md)   |
| `courierProfile` | [EntCourierProfile](EntCourierProfile.md) |
| `vendorProfile`  | [EntVendorProfile](EntVendorProfile.md)   |

## Example

```typescript
import type { EntUserEdges } from "";

// TODO: Update the object below with actual values
const example = {
	clientProfile: null,
	courierProfile: null,
	vendorProfile: null
} satisfies EntUserEdges;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EntUserEdges;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
