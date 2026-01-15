# EntProductEdges

## Properties

| Name       | Type                                        |
| ---------- | ------------------------------------------- |
| `category` | [EntProductCategory](EntProductCategory.md) |
| `vendor`   | [EntVendorProfile](EntVendorProfile.md)     |

## Example

```typescript
import type { EntProductEdges } from "";

// TODO: Update the object below with actual values
const example = {
	category: null,
	vendor: null
} satisfies EntProductEdges;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EntProductEdges;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
