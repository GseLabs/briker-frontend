# UserApi

All URIs are relative to _http://localhost_

| Method                        | HTTP request | Description                  |
| ----------------------------- | ------------ | ---------------------------- |
| [**meGet**](UserApi.md#meget) | **GET** /me  | Get current user information |

## meGet

> RoutesMeResponse meGet()

Get current user information

Get information about the currently authenticated user

### Example

```ts
import { Configuration, UserApi } from "";
import type { MeGetRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new UserApi();

	try {
		const data = await api.meGet();
		console.log(data);
	} catch (error) {
		console.error(error);
	}
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**RoutesMeResponse**](RoutesMeResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description           | Response headers |
| ----------- | --------------------- | ---------------- |
| **200**     | OK                    | -                |
| **401**     | Unauthorized          | -                |
| **500**     | Internal Server Error | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
