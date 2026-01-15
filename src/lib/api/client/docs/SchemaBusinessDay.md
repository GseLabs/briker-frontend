# SchemaBusinessDay

## Properties

| Name        | Type                                             |
| ----------- | ------------------------------------------------ |
| `breaks`    | [Array&lt;SchemaTimeSlot&gt;](SchemaTimeSlot.md) |
| `closeTime` | string                                           |
| `dayOfWeek` | [SchemaDayOfWeek](SchemaDayOfWeek.md)            |
| `isClosed`  | boolean                                          |
| `openTime`  | string                                           |

## Example

```typescript
import type { SchemaBusinessDay } from "";

// TODO: Update the object below with actual values
const example = {
	breaks: null,
	closeTime: null,
	dayOfWeek: null,
	isClosed: null,
	openTime: null
} satisfies SchemaBusinessDay;

console.log(example);

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example);
console.log(exampleJSON);

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SchemaBusinessDay;
console.log(exampleParsed);
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
