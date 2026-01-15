# AdminUpdateUserRequest

## Properties

| Name            | Type                        |
| --------------- | --------------------------- |
| `emailVerified` | boolean                     |
| `firstName`     | string                      |
| `lastName`      | string                      |
| `phone`         | string                      |
| `phoneVerified` | boolean                     |
| `role`          | [SchemaRole](SchemaRole.md) |
| `status`        | [UserStatus](UserStatus.md) |

## Example

```typescript
import type { AdminUpdateUserRequest } from "";

// TODO: Update the object below with actual values
const example = {
	emailVerified: null,
	firstName: null,
	lastName: null,
	phone: null,
	phoneVerified: null,
	role: null,
	status: null
} satisfies AdminUpdateUserRequest;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AdminUpdateUserRequest;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
