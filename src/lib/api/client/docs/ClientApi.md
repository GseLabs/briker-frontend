# ClientApi

All URIs are relative to _http://localhost_

| Method                                                | HTTP request            | Description        |
| ----------------------------------------------------- | ----------------------- | ------------------ |
| [**clientProfileGet**](ClientApi.md#clientprofileget) | **GET** /client/profile | Get client profile |

## clientProfileGet

> RoutesClientProfileResponse clientProfileGet()

Get client profile

Get the profile of the authenticated client

### Example

```ts
import { Configuration, ClientApi } from "";
import type { ClientProfileGetRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new ClientApi();

	try {
		const data = await api.clientProfileGet();
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

[**RoutesClientProfileResponse**](RoutesClientProfileResponse.md)

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
| **404**     | Not Found             | -                |
| **500**     | Internal Server Error | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
