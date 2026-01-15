# EntProduct

## Properties

| Name            | Type                                  |
| --------------- | ------------------------------------- |
| `categoryId`    | string                                |
| `createdAt`     | string                                |
| `description`   | string                                |
| `edges`         | [EntProductEdges](EntProductEdges.md) |
| `height`        | number                                |
| `id`            | string                                |
| `length`        | number                                |
| `name`          | string                                |
| `price`         | number                                |
| `productImages` | Array&lt;string&gt;                   |
| `reference`     | string                                |
| `status`        | [ProductStatus](ProductStatus.md)     |
| `stockQuantity` | number                                |
| `updatedAt`     | string                                |
| `vendorId`      | string                                |
| `weight`        | number                                |
| `width`         | number                                |

## Example

```typescript
import type { EntProduct } from "";

// TODO: Update the object below with actual values
const example = {
	categoryId: null,
	createdAt: null,
	description: null,
	edges: null,
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
	vendorId: null,
	weight: null,
	width: null
} satisfies EntProduct;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EntProduct;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
