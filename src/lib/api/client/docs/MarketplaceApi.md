# MarketplaceApi

All URIs are relative to _http://localhost_

| Method                                                             | HTTP request                   | Description               |
| ------------------------------------------------------------------ | ------------------------------ | ------------------------- |
| [**categoriesGet**](MarketplaceApi.md#categoriesget)               | **GET** /categories            | Get all categories        |
| [**categoriesIdGet**](MarketplaceApi.md#categoriesidget)           | **GET** /categories/{id}       | Get category by ID        |
| [**vehicleTypesGet**](MarketplaceApi.md#vehicletypesget)           | **GET** /vehicle-types         | List vehicle types        |
| [**vendorsIdGet**](MarketplaceApi.md#vendorsidget)                 | **GET** /vendors/{id}          | Get public vendor profile |
| [**vendorsIdProductsGet**](MarketplaceApi.md#vendorsidproductsget) | **GET** /vendors/{id}/products | Get vendor products       |

## categoriesGet

> RoutesCategoryListResponse categoriesGet(xLocale)

Get all categories

Get all available product categories

### Example

```ts
import { Configuration, MarketplaceApi } from "";
import type { CategoriesGetRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new MarketplaceApi();

	const body = {
		// string | Locale for response messages (optional)
		xLocale: xLocale_example
	} satisfies CategoriesGetRequest;

	try {
		const data = await api.categoriesGet(body);
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

[**RoutesCategoryListResponse**](RoutesCategoryListResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description           | Response headers |
| ----------- | --------------------- | ---------------- |
| **200**     | OK                    | -                |
| **500**     | Internal Server Error | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## categoriesIdGet

> RoutesCategoryResponse categoriesIdGet(id, xLocale)

Get category by ID

Get detailed information about a specific category

### Example

```ts
import { Configuration, MarketplaceApi } from "";
import type { CategoriesIdGetRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new MarketplaceApi();

	const body = {
		// string | Category ID (UUID)
		id: id_example,
		// string | Locale for response messages (optional)
		xLocale: xLocale_example
	} satisfies CategoriesIdGetRequest;

	try {
		const data = await api.categoriesIdGet(body);
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
| **id**      | `string` | Category ID (UUID)           | [Defaults to `undefined`]            |
| **xLocale** | `string` | Locale for response messages | [Optional] [Defaults to `undefined`] |

### Return type

[**RoutesCategoryResponse**](RoutesCategoryResponse.md)

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
| **404**     | Not Found             | -                |
| **500**     | Internal Server Error | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## vehicleTypesGet

> Array&lt;RoutesPublicVehicleTypeResponse&gt; vehicleTypesGet(xLocale)

List vehicle types

Get all available vehicle types with their specifications

### Example

```ts
import { Configuration, MarketplaceApi } from "";
import type { VehicleTypesGetRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new MarketplaceApi();

	const body = {
		// string | Locale for response messages (optional)
		xLocale: xLocale_example
	} satisfies VehicleTypesGetRequest;

	try {
		const data = await api.vehicleTypesGet(body);
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

[**Array&lt;RoutesPublicVehicleTypeResponse&gt;**](RoutesPublicVehicleTypeResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description           | Response headers |
| ----------- | --------------------- | ---------------- |
| **200**     | OK                    | -                |
| **500**     | Internal Server Error | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## vendorsIdGet

> RoutesPublicVendorResponse vendorsIdGet(id, xLocale)

Get public vendor profile

Get public profile information for a specific vendor

### Example

```ts
import { Configuration, MarketplaceApi } from "";
import type { VendorsIdGetRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new MarketplaceApi();

	const body = {
		// string | Vendor ID (UUID)
		id: id_example,
		// string | Locale for response messages (optional)
		xLocale: xLocale_example
	} satisfies VendorsIdGetRequest;

	try {
		const data = await api.vendorsIdGet(body);
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
| **id**      | `string` | Vendor ID (UUID)             | [Defaults to `undefined`]            |
| **xLocale** | `string` | Locale for response messages | [Optional] [Defaults to `undefined`] |

### Return type

[**RoutesPublicVendorResponse**](RoutesPublicVendorResponse.md)

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
| **404**     | Not Found             | -                |
| **500**     | Internal Server Error | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## vendorsIdProductsGet

> RoutesVendorProductListResponse vendorsIdProductsGet(id, xLocale, page, limit, categoryId, search)

Get vendor products

Get all public products for a specific vendor

### Example

```ts
import { Configuration, MarketplaceApi } from "";
import type { VendorsIdProductsGetRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new MarketplaceApi();

	const body = {
		// string | Vendor ID (UUID)
		id: id_example,
		// string | Locale for response messages (optional)
		xLocale: xLocale_example,
		// number | Page number (optional)
		page: 56,
		// number | Items per page (optional)
		limit: 56,
		// string | Category ID filter (optional)
		categoryId: categoryId_example,
		// string | Search in product names (optional)
		search: search_example
	} satisfies VendorsIdProductsGetRequest;

	try {
		const data = await api.vendorsIdProductsGet(body);
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
| **id**         | `string` | Vendor ID (UUID)             | [Defaults to `undefined`]            |
| **xLocale**    | `string` | Locale for response messages | [Optional] [Defaults to `undefined`] |
| **page**       | `number` | Page number                  | [Optional] [Defaults to `1`]         |
| **limit**      | `number` | Items per page               | [Optional] [Defaults to `20`]        |
| **categoryId** | `string` | Category ID filter           | [Optional] [Defaults to `undefined`] |
| **search**     | `string` | Search in product names      | [Optional] [Defaults to `undefined`] |

### Return type

[**RoutesVendorProductListResponse**](RoutesVendorProductListResponse.md)

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
| **404**     | Not Found             | -                |
| **500**     | Internal Server Error | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
