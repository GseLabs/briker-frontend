# RoutesProductResponse

## Properties

| Name            | Type                                        |
| --------------- | ------------------------------------------- |
| `category`      | [RoutesCategoryInfo](RoutesCategoryInfo.md) |
| `categoryId`    | string                                      |
| `createdAt`     | string                                      |
| `description`   | string                                      |
| `height`        | number                                      |
| `id`            | string                                      |
| `length`        | number                                      |
| `name`          | string                                      |
| `price`         | number                                      |
| `productImages` | Array&lt;string&gt;                         |
| `reference`     | string                                      |
| `status`        | string                                      |
| `stockQuantity` | number                                      |
| `updatedAt`     | string                                      |
| `vendor`        | [EntVendorProfile](EntVendorProfile.md)     |
| `weight`        | number                                      |
| `width`         | number                                      |

## Example

```typescript
import type { RoutesProductResponse } from "";

// TODO: Update the object below with actual values
const example = {
	category: null,
	categoryId: null,
	createdAt: null,
	description: null,
	height: null,
	id: null,
	length: null,
	name: null,
	price: null,
	productImages: null,
	reference: null,
	status: null,
	stockQuantity: null,
	updatedAt: null,
	vendor: null,
	weight: null,
	width: null
} satisfies RoutesProductResponse;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RoutesProductResponse;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
