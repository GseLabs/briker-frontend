# VerificationApi

All URIs are relative to _http://localhost_

| Method                                                                                            | HTTP request                                 | Description                               |
| ------------------------------------------------------------------------------------------------- | -------------------------------------------- | ----------------------------------------- |
| [**verificationSendEmailPost**](VerificationApi.md#verificationsendemailpost)                     | **POST** /verification/send-email            | Send email verification code              |
| [**verificationSendPasswordResetPost**](VerificationApi.md#verificationsendpasswordresetpost)     | **POST** /verification/send-password-reset   | Send password reset email                 |
| [**verificationSendPhonePost**](VerificationApi.md#verificationsendphonepost)                     | **POST** /verification/send-phone            | Send phone verification code              |
| [**verificationVerifyEmailTokenGet**](VerificationApi.md#verificationverifyemailtokenget)         | **GET** /verification/verify-email/{token}   | Verify email token                        |
| [**verificationVerifyPasswordResetPost**](VerificationApi.md#verificationverifypasswordresetpost) | **POST** /verification/verify-password-reset | Verify password reset and update password |
| [**verificationVerifyPhonePost**](VerificationApi.md#verificationverifyphonepost)                 | **POST** /verification/verify-phone          | Verify phone code                         |

## verificationSendEmailPost

> RoutesSendEmailVerificationResponse verificationSendEmailPost(xLocale)

Send email verification code

Send verification code to user\&#39;s email address

### Example

```ts
import { Configuration, VerificationApi } from "";
import type { VerificationSendEmailPostRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new VerificationApi();

	const body = {
		// string | Language code (optional)
		xLocale: xLocale_example
	} satisfies VerificationSendEmailPostRequest;

	try {
		const data = await api.verificationSendEmailPost(body);
		console.log(data);
	} catch (error) {
		console.error(error);
	}
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name        | Type     | Description   | Notes                                |
| ----------- | -------- | ------------- | ------------------------------------ |
| **xLocale** | `string` | Language code | [Optional] [Defaults to `undefined`] |

### Return type

[**RoutesSendEmailVerificationResponse**](RoutesSendEmailVerificationResponse.md)

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
| **500**     | Internal Server Error | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## verificationSendPasswordResetPost

> RoutesSendPasswordResetResponse verificationSendPasswordResetPost(body, xLocale)

Send password reset email

Send password reset link to user\&#39;s email

### Example

```ts
import {
  Configuration,
  VerificationApi,
} from '';
import type { VerificationSendPasswordResetPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VerificationApi();

  const body = {
    // RoutesSendPasswordResetRequest | Password Reset Request
    body: ...,
    // string | Language code (optional)
    xLocale: xLocale_example,
  } satisfies VerificationSendPasswordResetPostRequest;

  try {
    const data = await api.verificationSendPasswordResetPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name        | Type                                                                | Description            | Notes                                |
| ----------- | ------------------------------------------------------------------- | ---------------------- | ------------------------------------ |
| **body**    | [RoutesSendPasswordResetRequest](RoutesSendPasswordResetRequest.md) | Password Reset Request |                                      |
| **xLocale** | `string`                                                            | Language code          | [Optional] [Defaults to `undefined`] |

### Return type

[**RoutesSendPasswordResetResponse**](RoutesSendPasswordResetResponse.md)

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

## verificationSendPhonePost

> RoutesSendPhoneVerificationResponse verificationSendPhonePost(xLocale)

Send phone verification code

Send SMS verification code to phone number using Twilio

### Example

```ts
import { Configuration, VerificationApi } from "";
import type { VerificationSendPhonePostRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new VerificationApi();

	const body = {
		// string | Language code (optional)
		xLocale: xLocale_example
	} satisfies VerificationSendPhonePostRequest;

	try {
		const data = await api.verificationSendPhonePost(body);
		console.log(data);
	} catch (error) {
		console.error(error);
	}
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name        | Type     | Description   | Notes                                |
| ----------- | -------- | ------------- | ------------------------------------ |
| **xLocale** | `string` | Language code | [Optional] [Defaults to `undefined`] |

### Return type

[**RoutesSendPhoneVerificationResponse**](RoutesSendPhoneVerificationResponse.md)

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
| **500**     | Internal Server Error | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## verificationVerifyEmailTokenGet

> RoutesVerifyEmailResponse verificationVerifyEmailTokenGet(token, xLocale)

Verify email token

Verify email verification token

### Example

```ts
import { Configuration, VerificationApi } from "";
import type { VerificationVerifyEmailTokenGetRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new VerificationApi();

	const body = {
		// string | Verification Token
		token: token_example,
		// string | Language code (optional)
		xLocale: xLocale_example
	} satisfies VerificationVerifyEmailTokenGetRequest;

	try {
		const data = await api.verificationVerifyEmailTokenGet(body);
		console.log(data);
	} catch (error) {
		console.error(error);
	}
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name        | Type     | Description        | Notes                                |
| ----------- | -------- | ------------------ | ------------------------------------ |
| **token**   | `string` | Verification Token | [Defaults to `undefined`]            |
| **xLocale** | `string` | Language code      | [Optional] [Defaults to `undefined`] |

### Return type

[**RoutesVerifyEmailResponse**](RoutesVerifyEmailResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`

### HTTP response details

| Status code | Description           | Response headers |
| ----------- | --------------------- | ---------------- |
| **200**     | OK                    | -                |
| **400**     | Bad Request           | -                |
| **500**     | Internal Server Error | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## verificationVerifyPasswordResetPost

> RoutesVerifyPasswordResetResponse verificationVerifyPasswordResetPost(body, xLocale)

Verify password reset and update password

Verify reset token and update user password

### Example

```ts
import {
  Configuration,
  VerificationApi,
} from '';
import type { VerificationVerifyPasswordResetPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VerificationApi();

  const body = {
    // RoutesVerifyPasswordResetRequest | Password Reset Verification Request
    body: ...,
    // string | Language code (optional)
    xLocale: xLocale_example,
  } satisfies VerificationVerifyPasswordResetPostRequest;

  try {
    const data = await api.verificationVerifyPasswordResetPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name        | Type                                                                    | Description                         | Notes                                |
| ----------- | ----------------------------------------------------------------------- | ----------------------------------- | ------------------------------------ |
| **body**    | [RoutesVerifyPasswordResetRequest](RoutesVerifyPasswordResetRequest.md) | Password Reset Verification Request |                                      |
| **xLocale** | `string`                                                                | Language code                       | [Optional] [Defaults to `undefined`] |

### Return type

[**RoutesVerifyPasswordResetResponse**](RoutesVerifyPasswordResetResponse.md)

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

## verificationVerifyPhonePost

> RoutesVerifyPhoneResponse verificationVerifyPhonePost(body, xLocale)

Verify phone code

Verify SMS code sent to phone number

### Example

```ts
import {
  Configuration,
  VerificationApi,
} from '';
import type { VerificationVerifyPhonePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VerificationApi();

  const body = {
    // RoutesVerifyPhoneRequest | Phone Code Verification Request
    body: ...,
    // string | Language code (optional)
    xLocale: xLocale_example,
  } satisfies VerificationVerifyPhonePostRequest;

  try {
    const data = await api.verificationVerifyPhonePost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name        | Type                                                    | Description                     | Notes                                |
| ----------- | ------------------------------------------------------- | ------------------------------- | ------------------------------------ |
| **body**    | [RoutesVerifyPhoneRequest](RoutesVerifyPhoneRequest.md) | Phone Code Verification Request |                                      |
| **xLocale** | `string`                                                | Language code                   | [Optional] [Defaults to `undefined`] |

### Return type

[**RoutesVerifyPhoneResponse**](RoutesVerifyPhoneResponse.md)

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
