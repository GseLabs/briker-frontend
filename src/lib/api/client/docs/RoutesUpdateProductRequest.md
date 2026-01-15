# RoutesUpdateProductRequest

## Properties

| Name            | Type   |
| --------------- | ------ |
| `categoryId`    | string |
| `description`   | string |
| `height`        | number |
| `length`        | number |
| `name`          | string |
| `price`         | number |
| `reference`     | string |
| `status`        | string |
| `stockQuantity` | number |
| `weight`        | number |
| `width`         | number |

## Example

```typescript
import type { RoutesUpdateProductRequest } from "";

// TODO: Update the object below with actual values
const example = {
	categoryId: null,
	description: null,
	height: null,
	length: null,
	name: null,
	price: null,
	reference: null,
	status: null,
	stockQuantity: null,
	weight: null,
	width: null
} satisfies RoutesUpdateProductRequest;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RoutesUpdateProductRequest;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
