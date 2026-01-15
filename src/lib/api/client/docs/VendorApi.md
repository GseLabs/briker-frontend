# VendorApi

All URIs are relative to _http://localhost_

| Method                                                                                  | HTTP request                                    | Description                              |
| --------------------------------------------------------------------------------------- | ----------------------------------------------- | ---------------------------------------- |
| [**authRegisterVendorPost**](VendorApi.md#authregistervendorpost)                       | **POST** /auth/register-vendor                  | Register a new vendor                    |
| [**vendorOnboardingStatusGet**](VendorApi.md#vendoronboardingstatusget)                 | **GET** /vendor/onboarding-status               | Get onboarding status (vendor)           |
| [**vendorProductsGet**](VendorApi.md#vendorproductsget)                                 | **GET** /vendor/products                        | List products                            |
| [**vendorProductsIdDelete**](VendorApi.md#vendorproductsiddelete)                       | **DELETE** /vendor/products/{id}                | Delete product                           |
| [**vendorProductsIdGet**](VendorApi.md#vendorproductsidget)                             | **GET** /vendor/products/{id}                   | Get product                              |
| [**vendorProductsIdImagesIndexDelete**](VendorApi.md#vendorproductsidimagesindexdelete) | **DELETE** /vendor/products/{id}/images/{index} | Delete product image                     |
| [**vendorProductsIdImagesPost**](VendorApi.md#vendorproductsidimagespost)               | **POST** /vendor/products/{id}/images           | Add product image                        |
| [**vendorProductsIdPut**](VendorApi.md#vendorproductsidput)                             | **PUT** /vendor/products/{id}                   | Update product                           |
| [**vendorProductsPost**](VendorApi.md#vendorproductspost)                               | **POST** /vendor/products                       | Create product                           |
| [**vendorStripeLinkPost**](VendorApi.md#vendorstripelinkpost)                           | **POST** /vendor/stripe-link                    | Generate Stripe onboarding link (vendor) |

## authRegisterVendorPost

> RoutesVendorRegistrationResponse authRegisterVendorPost(registration, xLocale)

Register a new vendor

Register a new vendor with the provided details

### Example

```ts
import {
  Configuration,
  VendorApi,
} from '';
import type { AuthRegisterVendorPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VendorApi();

  const body = {
    // RoutesVendorRegistrationRequest | Vendor Registration Details
    registration: ...,
    // string | Locale for response messages (optional)
    xLocale: xLocale_example,
  } satisfies AuthRegisterVendorPostRequest;

  try {
    const data = await api.authRegisterVendorPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name             | Type                                                                  | Description                  | Notes                                |
| ---------------- | --------------------------------------------------------------------- | ---------------------------- | ------------------------------------ |
| **registration** | [RoutesVendorRegistrationRequest](RoutesVendorRegistrationRequest.md) | Vendor Registration Details  |                                      |
| **xLocale**      | `string`                                                              | Locale for response messages | [Optional] [Defaults to `undefined`] |

### Return type

[**RoutesVendorRegistrationResponse**](RoutesVendorRegistrationResponse.md)

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

## vendorOnboardingStatusGet

> RoutesOnboardingStatusResponse vendorOnboardingStatusGet(xLocale)

Get onboarding status (vendor)

Get the current onboarding status for the vendor

### Example

```ts
import { Configuration, VendorApi } from "";
import type { VendorOnboardingStatusGetRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new VendorApi();

	const body = {
		// string | Locale for response messages (optional)
		xLocale: xLocale_example
	} satisfies VendorOnboardingStatusGetRequest;

	try {
		const data = await api.vendorOnboardingStatusGet(body);
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

[**RoutesOnboardingStatusResponse**](RoutesOnboardingStatusResponse.md)

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

## vendorProductsGet

> RoutesProductListResponse vendorProductsGet(xLocale, page, limit, categoryId, status, search)

List products

List vendor products with pagination and filters (vendor only)

### Example

```ts
import { Configuration, VendorApi } from "";
import type { VendorProductsGetRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new VendorApi();

	const body = {
		// string | Locale for response messages (optional)
		xLocale: xLocale_example,
		// number | Page number (optional)
		page: 56,
		// number | Items per page (optional)
		limit: 56,
		// string | Category ID filter (optional)
		categoryId: categoryId_example,
		// string | Status filter (optional)
		status: status_example,
		// string | Search in product names (optional)
		search: search_example
	} satisfies VendorProductsGetRequest;

	try {
		const data = await api.vendorProductsGet(body);
		console.log(data);
	} catch (error) {
		console.error(error);
	}
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name           | Type     | Description                  | Notes                                |
| -------------- | -------- | ---------------------------- | ------------------------------------ |
| **xLocale**    | `string` | Locale for response messages | [Optional] [Defaults to `undefined`] |
| **page**       | `number` | Page number                  | [Optional] [Defaults to `1`]         |
| **limit**      | `number` | Items per page               | [Optional] [Defaults to `20`]        |
| **categoryId** | `string` | Category ID filter           | [Optional] [Defaults to `undefined`] |
| **status**     | `string` | Status filter                | [Optional] [Defaults to `undefined`] |
| **search**     | `string` | Search in product names      | [Optional] [Defaults to `undefined`] |

### Return type

[**RoutesProductListResponse**](RoutesProductListResponse.md)

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
| **500**     | Internal Server Error | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## vendorProductsIdDelete

> HttputilsSuccessResponse vendorProductsIdDelete(id, xLocale)

Delete product

Delete a product (vendor only)

### Example

```ts
import { Configuration, VendorApi } from "";
import type { VendorProductsIdDeleteRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new VendorApi();

	const body = {
		// string | Product ID (UUID)
		id: id_example,
		// string | Locale for response messages (optional)
		xLocale: xLocale_example
	} satisfies VendorProductsIdDeleteRequest;

	try {
		const data = await api.vendorProductsIdDelete(body);
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
| **id**      | `string` | Product ID (UUID)            | [Defaults to `undefined`]            |
| **xLocale** | `string` | Locale for response messages | [Optional] [Defaults to `undefined`] |

### Return type

[**HttputilsSuccessResponse**](HttputilsSuccessResponse.md)

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

## vendorProductsIdGet

> RoutesProductResponse vendorProductsIdGet(id, xLocale)

Get product

Get a specific product by ID (vendor only)

### Example

```ts
import { Configuration, VendorApi } from "";
import type { VendorProductsIdGetRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new VendorApi();

	const body = {
		// string | Product ID (UUID)
		id: id_example,
		// string | Locale for response messages (optional)
		xLocale: xLocale_example
	} satisfies VendorProductsIdGetRequest;

	try {
		const data = await api.vendorProductsIdGet(body);
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
| **id**      | `string` | Product ID (UUID)            | [Defaults to `undefined`]            |
| **xLocale** | `string` | Locale for response messages | [Optional] [Defaults to `undefined`] |

### Return type

[**RoutesProductResponse**](RoutesProductResponse.md)

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

## vendorProductsIdImagesIndexDelete

> HttputilsSuccessResponse vendorProductsIdImagesIndexDelete(id, index, xLocale)

Delete product image

Delete an image from a product by index (vendor only)

### Example

```ts
import { Configuration, VendorApi } from "";
import type { VendorProductsIdImagesIndexDeleteRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new VendorApi();

	const body = {
		// string | Product ID (UUID)
		id: id_example,
		// string | Image index (0-based)
		index: index_example,
		// string | Locale for response messages (optional)
		xLocale: xLocale_example
	} satisfies VendorProductsIdImagesIndexDeleteRequest;

	try {
		const data = await api.vendorProductsIdImagesIndexDelete(body);
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
| **id**      | `string` | Product ID (UUID)            | [Defaults to `undefined`]            |
| **index**   | `string` | Image index (0-based)        | [Defaults to `undefined`]            |
| **xLocale** | `string` | Locale for response messages | [Optional] [Defaults to `undefined`] |

### Return type

[**HttputilsSuccessResponse**](HttputilsSuccessResponse.md)

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

## vendorProductsIdImagesPost

> RoutesProductImageResponse vendorProductsIdImagesPost(id, image, xLocale)

Add product image

Add an image to a product (vendor only)

### Example

```ts
import {
  Configuration,
  VendorApi,
} from '';
import type { VendorProductsIdImagesPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VendorApi();

  const body = {
    // string | Product ID (UUID)
    id: id_example,
    // RoutesProductImageRequest | Image data with base64 and filename
    image: ...,
    // string | Locale for response messages (optional)
    xLocale: xLocale_example,
  } satisfies VendorProductsIdImagesPostRequest;

  try {
    const data = await api.vendorProductsIdImagesPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name        | Type                                                      | Description                         | Notes                                |
| ----------- | --------------------------------------------------------- | ----------------------------------- | ------------------------------------ |
| **id**      | `string`                                                  | Product ID (UUID)                   | [Defaults to `undefined`]            |
| **image**   | [RoutesProductImageRequest](RoutesProductImageRequest.md) | Image data with base64 and filename |                                      |
| **xLocale** | `string`                                                  | Locale for response messages        | [Optional] [Defaults to `undefined`] |

### Return type

[**RoutesProductImageResponse**](RoutesProductImageResponse.md)

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
| **403**     | Forbidden             | -                |
| **404**     | Not Found             | -                |
| **500**     | Internal Server Error | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## vendorProductsIdPut

> RoutesProductResponse vendorProductsIdPut(id, product, xLocale)

Update product

Update a product (vendor only)

### Example

```ts
import {
  Configuration,
  VendorApi,
} from '';
import type { VendorProductsIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VendorApi();

  const body = {
    // string | Product ID (UUID)
    id: id_example,
    // RoutesUpdateProductRequest | Product details
    product: ...,
    // string | Locale for response messages (optional)
    xLocale: xLocale_example,
  } satisfies VendorProductsIdPutRequest;

  try {
    const data = await api.vendorProductsIdPut(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name        | Type                                                        | Description                  | Notes                                |
| ----------- | ----------------------------------------------------------- | ---------------------------- | ------------------------------------ |
| **id**      | `string`                                                    | Product ID (UUID)            | [Defaults to `undefined`]            |
| **product** | [RoutesUpdateProductRequest](RoutesUpdateProductRequest.md) | Product details              |                                      |
| **xLocale** | `string`                                                    | Locale for response messages | [Optional] [Defaults to `undefined`] |

### Return type

[**RoutesProductResponse**](RoutesProductResponse.md)

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
| **403**     | Forbidden             | -                |
| **404**     | Not Found             | -                |
| **500**     | Internal Server Error | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## vendorProductsPost

> RoutesProductResponse vendorProductsPost(product, xLocale)

Create product

Create a new product (vendor only)

### Example

```ts
import {
  Configuration,
  VendorApi,
} from '';
import type { VendorProductsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VendorApi();

  const body = {
    // RoutesCreateProductRequest | Product details
    product: ...,
    // string | Locale for response messages (optional)
    xLocale: xLocale_example,
  } satisfies VendorProductsPostRequest;

  try {
    const data = await api.vendorProductsPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name        | Type                                                        | Description                  | Notes                                |
| ----------- | ----------------------------------------------------------- | ---------------------------- | ------------------------------------ |
| **product** | [RoutesCreateProductRequest](RoutesCreateProductRequest.md) | Product details              |                                      |
| **xLocale** | `string`                                                    | Locale for response messages | [Optional] [Defaults to `undefined`] |

### Return type

[**RoutesProductResponse**](RoutesProductResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description           | Response headers |
| ----------- | --------------------- | ---------------- |
| **201**     | Created               | -                |
| **400**     | Bad Request           | -                |
| **401**     | Unauthorized          | -                |
| **403**     | Forbidden             | -                |
| **500**     | Internal Server Error | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## vendorStripeLinkPost

> RoutesStripeLinkResponse vendorStripeLinkPost(xLocale)

Generate Stripe onboarding link (vendor)

Generate a fresh Stripe onboarding link for an approved vendor

### Example

```ts
import { Configuration, VendorApi } from "";
import type { VendorStripeLinkPostRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new VendorApi();

	const body = {
		// string | Locale for response messages (optional)
		xLocale: xLocale_example
	} satisfies VendorStripeLinkPostRequest;

	try {
		const data = await api.vendorStripeLinkPost(body);
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

[**RoutesStripeLinkResponse**](RoutesStripeLinkResponse.md)

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
