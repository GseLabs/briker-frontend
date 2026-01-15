# RoutesProductListResponse

## Properties

| Name       | Type                                                           |
| ---------- | -------------------------------------------------------------- |
| `hasMore`  | boolean                                                        |
| `limit`    | number                                                         |
| `page`     | number                                                         |
| `products` | [Array&lt;RoutesProductResponse&gt;](RoutesProductResponse.md) |
| `total`    | number                                                         |

## Example

```typescript
import type { RoutesProductListResponse } from "";

// TODO: Update the object below with actual values
const example = {
	hasMore: null,
	limit: null,
	page: null,
	products: null,
	total: null
} satisfies RoutesProductListResponse;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RoutesProductListResponse;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
