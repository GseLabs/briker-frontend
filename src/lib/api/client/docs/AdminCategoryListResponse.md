# AdminCategoryListResponse

## Properties

| Name         | Type                                                           |
| ------------ | -------------------------------------------------------------- |
| `categories` | [Array&lt;AdminCategoryResponse&gt;](AdminCategoryResponse.md) |
| `hasMore`    | boolean                                                        |
| `limit`      | number                                                         |
| `page`       | number                                                         |
| `total`      | number                                                         |

## Example

```typescript
import type { AdminCategoryListResponse } from "";

// TODO: Update the object below with actual values
const example = {
	categories: null,
	hasMore: null,
	limit: null,
	page: null,
	total: null
} satisfies AdminCategoryListResponse;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AdminCategoryListResponse;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
