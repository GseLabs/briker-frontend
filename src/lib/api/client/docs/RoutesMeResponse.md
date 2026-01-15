# RoutesMeResponse

## Properties

| Name            | Type                        |
| --------------- | --------------------------- |
| `createdAt`     | string                      |
| `email`         | string                      |
| `emailVerified` | boolean                     |
| `firstName`     | string                      |
| `id`            | string                      |
| `lastName`      | string                      |
| `phone`         | string                      |
| `phoneVerified` | boolean                     |
| `role`          | [SchemaRole](SchemaRole.md) |
| `updatedAt`     | string                      |

## Example

```typescript
import type { RoutesMeResponse } from "";

// TODO: Update the object below with actual values
const example = {
	createdAt: null,
	email: null,
	emailVerified: null,
	firstName: null,
	id: null,
	lastName: null,
	phone: null,
	phoneVerified: null,
	role: null,
	updatedAt: null
} satisfies RoutesMeResponse;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RoutesMeResponse;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
