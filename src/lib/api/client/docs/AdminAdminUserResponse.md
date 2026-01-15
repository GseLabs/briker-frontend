# AdminAdminUserResponse

## Properties

| Name             | Type                        |
| ---------------- | --------------------------- |
| `approvalStatus` | string                      |
| `createdAt`      | string                      |
| `email`          | string                      |
| `emailVerified`  | boolean                     |
| `firstName`      | string                      |
| `id`             | string                      |
| `lastLogin`      | string                      |
| `lastName`       | string                      |
| `phone`          | string                      |
| `phoneVerified`  | boolean                     |
| `role`           | [SchemaRole](SchemaRole.md) |
| `status`         | [UserStatus](UserStatus.md) |
| `updatedAt`      | string                      |

## Example

```typescript
import type { AdminAdminUserResponse } from "";

// TODO: Update the object below with actual values
const example = {
	approvalStatus: null,
	createdAt: null,
	email: null,
	emailVerified: null,
	firstName: null,
	id: null,
	lastLogin: null,
	lastName: null,
	phone: null,
	phoneVerified: null,
	role: null,
	status: null,
	updatedAt: null
} satisfies AdminAdminUserResponse;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AdminAdminUserResponse;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
