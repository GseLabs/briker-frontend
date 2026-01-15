# EntVendorProfileEdges

## Properties

| Name       | Type                                     |
| ---------- | ---------------------------------------- |
| `products` | [Array&lt;EntProduct&gt;](EntProduct.md) |
| `user`     | [EntUser](EntUser.md)                    |

## Example

```typescript
import type { EntVendorProfileEdges } from "";

// TODO: Update the object below with actual values
const example = {
	products: null,
	user: null
} satisfies EntVendorProfileEdges;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EntVendorProfileEdges;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
