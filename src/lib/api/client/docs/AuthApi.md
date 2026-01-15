# AuthApi

All URIs are relative to _http://localhost_

| Method                                              | HTTP request            | Description          |
| --------------------------------------------------- | ----------------------- | -------------------- |
| [**authLoginPost**](AuthApi.md#authloginpost)       | **POST** /auth/login    | Login user           |
| [**authLogoutPost**](AuthApi.md#authlogoutpost)     | **POST** /auth/logout   | Logout user          |
| [**authRefreshPost**](AuthApi.md#authrefreshpost)   | **POST** /auth/refresh  | Refresh access token |
| [**authRegisterPost**](AuthApi.md#authregisterpost) | **POST** /auth/register | Register a new user  |

## authLoginPost

> RoutesLoginResponse authLoginPost(body, xLocale)

Login user

Authenticate user with email and password

### Example

```ts
import {
  Configuration,
  AuthApi,
} from '';
import type { AuthLoginPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthApi();

  const body = {
    // RoutesLoginRequest | Login Request
    body: ...,
    // string | Language code (optional)
    xLocale: xLocale_example,
  } satisfies AuthLoginPostRequest;

  try {
    const data = await api.authLoginPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name        | Type                                        | Description   | Notes                                |
| ----------- | ------------------------------------------- | ------------- | ------------------------------------ |
| **body**    | [RoutesLoginRequest](RoutesLoginRequest.md) | Login Request |                                      |
| **xLocale** | `string`                                    | Language code | [Optional] [Defaults to `undefined`] |

### Return type

[**RoutesLoginResponse**](RoutesLoginResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description           | Response headers |
| ----------- | --------------------- | ---------------- |
| **200**     | OK                    | -                |
| **400**     | Bad Request           | -                |
| **401**     | Unauthorized          | -                |
| **500**     | Internal Server Error | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## authLogoutPost

> { [key: string]: string; } authLogoutPost()

Logout user

Invalidate session and clear cookies

### Example

```ts
import { Configuration, AuthApi } from "";
import type { AuthLogoutPostRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new AuthApi();

	try {
		const data = await api.authLogoutPost();
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

**{ [key: string]: string; }**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`

### HTTP response details

| Status code | Description  | Response headers |
| ----------- | ------------ | ---------------- |
| **200**     | OK           | -                |
| **401**     | Unauthorized | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## authRefreshPost

> RoutesLoginResponse authRefreshPost(body)

Refresh access token

Get new access token using refresh token

### Example

```ts
import {
  Configuration,
  AuthApi,
} from '';
import type { AuthRefreshPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthApi();

  const body = {
    // RoutesRefreshRequest | Refresh Request
    body: ...,
  } satisfies AuthRefreshPostRequest;

  try {
    const data = await api.authRefreshPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name     | Type                                            | Description     | Notes |
| -------- | ----------------------------------------------- | --------------- | ----- |
| **body** | [RoutesRefreshRequest](RoutesRefreshRequest.md) | Refresh Request |       |

### Return type

[**RoutesLoginResponse**](RoutesLoginResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description           | Response headers |
| ----------- | --------------------- | ---------------- |
| **200**     | OK                    | -                |
| **400**     | Bad Request           | -                |
| **401**     | Unauthorized          | -                |
| **500**     | Internal Server Error | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## authRegisterPost

> RoutesRegisterResponse authRegisterPost(body, xLocale)

Register a new user

This function is used to register a new user

### Example

```ts
import {
  Configuration,
  AuthApi,
} from '';
import type { AuthRegisterPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthApi();

  const body = {
    // RoutesRegisterRequest | Register Request
    body: ...,
    // string | Language code (optional)
    xLocale: xLocale_example,
  } satisfies AuthRegisterPostRequest;

  try {
    const data = await api.authRegisterPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name        | Type                                              | Description      | Notes                                |
| ----------- | ------------------------------------------------- | ---------------- | ------------------------------------ |
| **body**    | [RoutesRegisterRequest](RoutesRegisterRequest.md) | Register Request |                                      |
| **xLocale** | `string`                                          | Language code    | [Optional] [Defaults to `undefined`] |

### Return type

[**RoutesRegisterResponse**](RoutesRegisterResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description           | Response headers |
| ----------- | --------------------- | ---------------- |
| **200**     | OK                    | -                |
| **400**     | Bad Request           | -                |
| **500**     | Internal Server Error | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
