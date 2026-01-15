# CourierApi

All URIs are relative to _http://localhost_

| Method                                                                     | HTTP request                       | Description                               |
| -------------------------------------------------------------------------- | ---------------------------------- | ----------------------------------------- |
| [**authRegisterCourierPost**](CourierApi.md#authregistercourierpost)       | **POST** /auth/register-courier    | Register a new courier                    |
| [**courierOnboardingStatusGet**](CourierApi.md#courieronboardingstatusget) | **GET** /courier/onboarding-status | Get onboarding status (courier)           |
| [**courierStripeLinkPost**](CourierApi.md#courierstripelinkpost)           | **POST** /courier/stripe-link      | Generate Stripe onboarding link (courier) |

## authRegisterCourierPost

> RoutesCourierRegistrationResponse authRegisterCourierPost(registration)

Register a new courier

Register a new courier with the provided details

### Example

```ts
import {
  Configuration,
  CourierApi,
} from '';
import type { AuthRegisterCourierPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CourierApi();

  const body = {
    // RoutesCourierRegistrationRequest | Courier Registration Details
    registration: ...,
  } satisfies AuthRegisterCourierPostRequest;

  try {
    const data = await api.authRegisterCourierPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name             | Type                                                                    | Description                  | Notes |
| ---------------- | ----------------------------------------------------------------------- | ---------------------------- | ----- |
| **registration** | [RoutesCourierRegistrationRequest](RoutesCourierRegistrationRequest.md) | Courier Registration Details |       |

### Return type

[**RoutesCourierRegistrationResponse**](RoutesCourierRegistrationResponse.md)

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

## courierOnboardingStatusGet

> RoutesCourierOnboardingStatusResponse courierOnboardingStatusGet(xLocale)

Get onboarding status (courier)

Get the current onboarding status for the courier

### Example

```ts
import { Configuration, CourierApi } from "";
import type { CourierOnboardingStatusGetRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new CourierApi();

	const body = {
		// string | Locale for response messages (optional)
		xLocale: xLocale_example
	} satisfies CourierOnboardingStatusGetRequest;

	try {
		const data = await api.courierOnboardingStatusGet(body);
		console.log(data);
	} catch (error) {
		console.error(error);
	}
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name        | Type     | Description                  | Notes                                |
| ----------- | -------- | ---------------------------- | ------------------------------------ |
| **xLocale** | `string` | Locale for response messages | [Optional] [Defaults to `undefined`] |

### Return type

[**RoutesCourierOnboardingStatusResponse**](RoutesCourierOnboardingStatusResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description           | Response headers |
| ----------- | --------------------- | ---------------- |
| **200**     | OK                    | -                |
| **400**     | Bad Request           | -                |
| **401**     | Unauthorized          | -                |
| **403**     | Forbidden             | -                |
| **404**     | Not Found             | -                |
| **500**     | Internal Server Error | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## courierStripeLinkPost

> RoutesCourierStripeLinkResponse courierStripeLinkPost(xLocale)

Generate Stripe onboarding link (courier)

Generate a fresh Stripe onboarding link for an approved courier

### Example

```ts
import { Configuration, CourierApi } from "";
import type { CourierStripeLinkPostRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new CourierApi();

	const body = {
		// string | Locale for response messages (optional)
		xLocale: xLocale_example
	} satisfies CourierStripeLinkPostRequest;

	try {
		const data = await api.courierStripeLinkPost(body);
		console.log(data);
	} catch (error) {
		console.error(error);
	}
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name        | Type     | Description                  | Notes                                |
| ----------- | -------- | ---------------------------- | ------------------------------------ |
| **xLocale** | `string` | Locale for response messages | [Optional] [Defaults to `undefined`] |

### Return type

[**RoutesCourierStripeLinkResponse**](RoutesCourierStripeLinkResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description           | Response headers |
| ----------- | --------------------- | ---------------- |
| **200**     | OK                    | -                |
| **400**     | Bad Request           | -                |
| **401**     | Unauthorized          | -                |
| **403**     | Forbidden             | -                |
| **404**     | Not Found             | -                |
| **500**     | Internal Server Error | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
