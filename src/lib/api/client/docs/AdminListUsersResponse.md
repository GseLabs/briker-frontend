# AdminListUsersResponse

## Properties

| Name    | Type                                                             |
| ------- | ---------------------------------------------------------------- |
| `limit` | number                                                           |
| `page`  | number                                                           |
| `total` | number                                                           |
| `users` | [Array&lt;AdminAdminUserResponse&gt;](AdminAdminUserResponse.md) |

## Example

```typescript
import type { AdminListUsersResponse } from "";

// TODO: Update the object below with actual values
const example = {
	limit: null,
	page: null,
	total: null,
	users: null
} satisfies AdminListUsersResponse;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AdminListUsersResponse;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
