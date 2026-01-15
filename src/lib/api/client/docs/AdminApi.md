# AdminApi

All URIs are relative to _http://localhost_

| Method                                                                             | HTTP request                                  | Description                    |
| ---------------------------------------------------------------------------------- | --------------------------------------------- | ------------------------------ |
| [**adminCategoriesGet**](AdminApi.md#admincategoriesget)                           | **GET** /admin/categories                     | List all categories            |
| [**adminCategoriesIdDelete**](AdminApi.md#admincategoriesiddelete)                 | **DELETE** /admin/categories/{id}             | Delete category                |
| [**adminCategoriesIdGet**](AdminApi.md#admincategoriesidget)                       | **GET** /admin/categories/{id}                | Get category by ID             |
| [**adminCategoriesIdPut**](AdminApi.md#admincategoriesidput)                       | **PUT** /admin/categories/{id}                | Update category                |
| [**adminCategoriesPost**](AdminApi.md#admincategoriespost)                         | **POST** /admin/categories                    | Create category                |
| [**adminCouriersGet**](AdminApi.md#admincouriersget)                               | **GET** /admin/couriers                       | List couriers (admin)          |
| [**adminCouriersIdApprovePost**](AdminApi.md#admincouriersidapprovepost)           | **POST** /admin/couriers/{id}/approve         | Approve courier (admin)        |
| [**adminCouriersIdDenyPost**](AdminApi.md#admincouriersiddenypost)                 | **POST** /admin/couriers/{id}/deny            | Deny courier (admin)           |
| [**adminCouriersIdDocumentsTypeGet**](AdminApi.md#admincouriersiddocumentstypeget) | **GET** /admin/couriers/{id}/documents/{type} | Get courier document (admin)   |
| [**adminCouriersIdGet**](AdminApi.md#admincouriersidget)                           | **GET** /admin/couriers/{id}                  | Get courier by ID (admin)      |
| [**adminUsersExportGet**](AdminApi.md#adminusersexportget)                         | **GET** /admin/users/export                   | Export users (admin)           |
| [**adminUsersGet**](AdminApi.md#adminusersget)                                     | **GET** /admin/users                          | List users (admin)             |
| [**adminUsersIdGet**](AdminApi.md#adminusersidget)                                 | **GET** /admin/users/{id}                     | Get user by ID (admin)         |
| [**adminUsersIdPatch**](AdminApi.md#adminusersidpatch)                             | **PATCH** /admin/users/{id}                   | Update user (admin)            |
| [**adminVehicleTypesIdDelete**](AdminApi.md#adminvehicletypesiddelete)             | **DELETE** /admin/vehicle-types/{id}          | Delete vehicle type (admin)    |
| [**adminVehicleTypesIdGet**](AdminApi.md#adminvehicletypesidget)                   | **GET** /admin/vehicle-types/{id}             | Get vehicle type by ID (admin) |
| [**adminVehicleTypesIdPut**](AdminApi.md#adminvehicletypesidput)                   | **PUT** /admin/vehicle-types/{id}             | Update vehicle type (admin)    |
| [**adminVehicleTypesPost**](AdminApi.md#adminvehicletypespost)                     | **POST** /admin/vehicle-types                 | Create vehicle type (admin)    |
| [**adminVendorsGet**](AdminApi.md#adminvendorsget)                                 | **GET** /admin/vendors                        | List vendors (admin)           |
| [**adminVendorsIdApprovePost**](AdminApi.md#adminvendorsidapprovepost)             | **POST** /admin/vendors/{id}/approve          | Approve vendor (admin)         |
| [**adminVendorsIdDenyPost**](AdminApi.md#adminvendorsiddenypost)                   | **POST** /admin/vendors/{id}/deny             | Deny vendor (admin)            |
| [**adminVendorsIdDocumentsTypeGet**](AdminApi.md#adminvendorsiddocumentstypeget)   | **GET** /admin/vendors/{id}/documents/{type}  | Get vendor document (admin)    |
| [**adminVendorsIdGet**](AdminApi.md#adminvendorsidget)                             | **GET** /admin/vendors/{id}                   | Get vendor by ID (admin)       |

## adminCategoriesGet

> AdminCategoryListResponse adminCategoriesGet(xLocale, page, limit, search)

List all categories

List all product categories (admin only)

### Example

```ts
import { Configuration, AdminApi } from "";
import type { AdminCategoriesGetRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new AdminApi();

	const body = {
		// string | Locale for response messages (optional)
		xLocale: xLocale_example,
		// number | Page number (optional)
		page: 56,
		// number | Items per page (optional)
		limit: 56,
		// string | Search in category names (optional)
		search: search_example
	} satisfies AdminCategoriesGetRequest;

	try {
		const data = await api.adminCategoriesGet(body);
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
| **page**    | `number` | Page number                  | [Optional] [Defaults to `1`]         |
| **limit**   | `number` | Items per page               | [Optional] [Defaults to `20`]        |
| **search**  | `string` | Search in category names     | [Optional] [Defaults to `undefined`] |

### Return type

[**AdminCategoryListResponse**](AdminCategoryListResponse.md)

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

## adminCategoriesIdDelete

> HttputilsSuccessResponse adminCategoriesIdDelete(id, xLocale)

Delete category

Delete a product category (admin only)

### Example

```ts
import { Configuration, AdminApi } from "";
import type { AdminCategoriesIdDeleteRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new AdminApi();

	const body = {
		// string | Category ID (UUID)
		id: id_example,
		// string | Locale for response messages (optional)
		xLocale: xLocale_example
	} satisfies AdminCategoriesIdDeleteRequest;

	try {
		const data = await api.adminCategoriesIdDelete(body);
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

## adminCategoriesIdGet

> AdminCategoryResponse adminCategoriesIdGet(id, xLocale)

Get category by ID

Get a specific category by ID (admin only)

### Example

```ts
import { Configuration, AdminApi } from "";
import type { AdminCategoriesIdGetRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new AdminApi();

	const body = {
		// string | Category ID (UUID)
		id: id_example,
		// string | Locale for response messages (optional)
		xLocale: xLocale_example
	} satisfies AdminCategoriesIdGetRequest;

	try {
		const data = await api.adminCategoriesIdGet(body);
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

[**AdminCategoryResponse**](AdminCategoryResponse.md)

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

## adminCategoriesIdPut

> AdminCategoryResponse adminCategoriesIdPut(id, category, xLocale)

Update category

Update a product category (admin only)

### Example

```ts
import {
  Configuration,
  AdminApi,
} from '';
import type { AdminCategoriesIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AdminApi();

  const body = {
    // string | Category ID (UUID)
    id: id_example,
    // AdminUpdateCategoryRequest | Category details
    category: ...,
    // string | Locale for response messages (optional)
    xLocale: xLocale_example,
  } satisfies AdminCategoriesIdPutRequest;

  try {
    const data = await api.adminCategoriesIdPut(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name         | Type                                                        | Description                  | Notes                                |
| ------------ | ----------------------------------------------------------- | ---------------------------- | ------------------------------------ |
| **id**       | `string`                                                    | Category ID (UUID)           | [Defaults to `undefined`]            |
| **category** | [AdminUpdateCategoryRequest](AdminUpdateCategoryRequest.md) | Category details             |                                      |
| **xLocale**  | `string`                                                    | Locale for response messages | [Optional] [Defaults to `undefined`] |

### Return type

[**AdminCategoryResponse**](AdminCategoryResponse.md)

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

## adminCategoriesPost

> AdminCategoryResponse adminCategoriesPost(category, xLocale)

Create category

Create a new product category (admin only)

### Example

```ts
import {
  Configuration,
  AdminApi,
} from '';
import type { AdminCategoriesPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AdminApi();

  const body = {
    // AdminCreateCategoryRequest | Category details
    category: ...,
    // string | Locale for response messages (optional)
    xLocale: xLocale_example,
  } satisfies AdminCategoriesPostRequest;

  try {
    const data = await api.adminCategoriesPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name         | Type                                                        | Description                  | Notes                                |
| ------------ | ----------------------------------------------------------- | ---------------------------- | ------------------------------------ |
| **category** | [AdminCreateCategoryRequest](AdminCreateCategoryRequest.md) | Category details             |                                      |
| **xLocale**  | `string`                                                    | Locale for response messages | [Optional] [Defaults to `undefined`] |

### Return type

[**AdminCategoryResponse**](AdminCategoryResponse.md)

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

## adminCouriersGet

> AdminListCouriersResponse adminCouriersGet(xLocale, status, page, limit)

List couriers (admin)

Get a paginated list of couriers with optional filters

### Example

```ts
import { Configuration, AdminApi } from "";
import type { AdminCouriersGetRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new AdminApi();

	const body = {
		// string | Locale for response messages (optional)
		xLocale: xLocale_example,
		// string | Filter by status (optional)
		status: status_example,
		// number | Page number (default: 1) (optional)
		page: 56,
		// number | Items per page (default: 50, max: 100) (optional)
		limit: 56
	} satisfies AdminCouriersGetRequest;

	try {
		const data = await api.adminCouriersGet(body);
		console.log(data);
	} catch (error) {
		console.error(error);
	}
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name        | Type     | Description                            | Notes                                |
| ----------- | -------- | -------------------------------------- | ------------------------------------ |
| **xLocale** | `string` | Locale for response messages           | [Optional] [Defaults to `undefined`] |
| **status**  | `string` | Filter by status                       | [Optional] [Defaults to `undefined`] |
| **page**    | `number` | Page number (default: 1)               | [Optional] [Defaults to `undefined`] |
| **limit**   | `number` | Items per page (default: 50, max: 100) | [Optional] [Defaults to `undefined`] |

### Return type

[**AdminListCouriersResponse**](AdminListCouriersResponse.md)

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

## adminCouriersIdApprovePost

> HttputilsSuccessResponse adminCouriersIdApprovePost(id, xLocale)

Approve courier (admin)

Approve a courier application, create Stripe Connect account and send onboarding email

### Example

```ts
import { Configuration, AdminApi } from "";
import type { AdminCouriersIdApprovePostRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new AdminApi();

	const body = {
		// string | Courier ID (UUID)
		id: id_example,
		// string | Locale for response messages (optional)
		xLocale: xLocale_example
	} satisfies AdminCouriersIdApprovePostRequest;

	try {
		const data = await api.adminCouriersIdApprovePost(body);
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
| **id**      | `string` | Courier ID (UUID)            | [Defaults to `undefined`]            |
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

## adminCouriersIdDenyPost

> HttputilsSuccessResponse adminCouriersIdDenyPost(id, xLocale)

Deny courier (admin)

Deny a courier application

### Example

```ts
import { Configuration, AdminApi } from "";
import type { AdminCouriersIdDenyPostRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new AdminApi();

	const body = {
		// string | Courier ID (UUID)
		id: id_example,
		// string | Locale for response messages (optional)
		xLocale: xLocale_example
	} satisfies AdminCouriersIdDenyPostRequest;

	try {
		const data = await api.adminCouriersIdDenyPost(body);
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
| **id**      | `string` | Courier ID (UUID)            | [Defaults to `undefined`]            |
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

## adminCouriersIdDocumentsTypeGet

> Blob adminCouriersIdDocumentsTypeGet(id, type, xLocale)

Get courier document (admin)

Download/view a specific document for a courier (admin only, GDPR compliant)

### Example

```ts
import { Configuration, AdminApi } from "";
import type { AdminCouriersIdDocumentsTypeGetRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new AdminApi();

	const body = {
		// string | Courier ID (UUID)
		id: id_example,
		// string | Document type (vehicle_registration, vehicle_inspection, vehicle_insurance, professional_liability, driver_license, transport_license)
		type: type_example,
		// string | Locale for response messages (optional)
		xLocale: xLocale_example
	} satisfies AdminCouriersIdDocumentsTypeGetRequest;

	try {
		const data = await api.adminCouriersIdDocumentsTypeGet(body);
		console.log(data);
	} catch (error) {
		console.error(error);
	}
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name        | Type     | Description                                                                                                                            | Notes                                |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| **id**      | `string` | Courier ID (UUID)                                                                                                                      | [Defaults to `undefined`]            |
| **type**    | `string` | Document type (vehicle_registration, vehicle_inspection, vehicle_insurance, professional_liability, driver_license, transport_license) | [Defaults to `undefined`]            |
| **xLocale** | `string` | Locale for response messages                                                                                                           | [Optional] [Defaults to `undefined`] |

### Return type

**Blob**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/octet-stream`

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

## adminCouriersIdGet

> AdminAdminCourierResponse adminCouriersIdGet(id, xLocale)

Get courier by ID (admin)

Get a specific courier by their ID (admin only)

### Example

```ts
import { Configuration, AdminApi } from "";
import type { AdminCouriersIdGetRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new AdminApi();

	const body = {
		// string | Courier ID (UUID)
		id: id_example,
		// string | Locale for response messages (optional)
		xLocale: xLocale_example
	} satisfies AdminCouriersIdGetRequest;

	try {
		const data = await api.adminCouriersIdGet(body);
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
| **id**      | `string` | Courier ID (UUID)            | [Defaults to `undefined`]            |
| **xLocale** | `string` | Locale for response messages | [Optional] [Defaults to `undefined`] |

### Return type

[**AdminAdminCourierResponse**](AdminAdminCourierResponse.md)

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

## adminUsersExportGet

> Blob adminUsersExportGet(xLocale, role, verified, limit)

Export users (admin)

Export users to CSV with optional filters

### Example

```ts
import { Configuration, AdminApi } from "";
import type { AdminUsersExportGetRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new AdminApi();

	const body = {
		// string | Locale for response messages (optional)
		xLocale: xLocale_example,
		// 'client' | 'courier' | 'vendor' | 'vendor_employee' | 'admin' | Filter by role (optional)
		role: role_example,
		// boolean | Filter by both email and phone verification status (optional)
		verified: true,
		// number | Maximum number of users to export (default: 1000, max: 10000) (optional)
		limit: 56
	} satisfies AdminUsersExportGetRequest;

	try {
		const data = await api.adminUsersExportGet(body);
		console.log(data);
	} catch (error) {
		console.error(error);
	}
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name         | Type                                                      | Description                                                   | Notes                                                                                        |
| ------------ | --------------------------------------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **xLocale**  | `string`                                                  | Locale for response messages                                  | [Optional] [Defaults to `undefined`]                                                         |
| **role**     | `client`, `courier`, `vendor`, `vendor_employee`, `admin` | Filter by role                                                | [Optional] [Defaults to `undefined`] [Enum: client, courier, vendor, vendor_employee, admin] |
| **verified** | `boolean`                                                 | Filter by both email and phone verification status            | [Optional] [Defaults to `undefined`]                                                         |
| **limit**    | `number`                                                  | Maximum number of users to export (default: 1000, max: 10000) | [Optional] [Defaults to `undefined`]                                                         |

### Return type

**Blob**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/csv`

### HTTP response details

| Status code | Description           | Response headers |
| ----------- | --------------------- | ---------------- |
| **200**     | CSV file              | -                |
| **400**     | Bad Request           | -                |
| **401**     | Unauthorized          | -                |
| **403**     | Forbidden             | -                |
| **500**     | Internal Server Error | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## adminUsersGet

> AdminListUsersResponse adminUsersGet(xLocale, role, verified, page, limit)

List users (admin)

Get a paginated list of users with optional filters

### Example

```ts
import { Configuration, AdminApi } from "";
import type { AdminUsersGetRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new AdminApi();

	const body = {
		// string | Locale for response messages (optional)
		xLocale: xLocale_example,
		// 'client' | 'courier' | 'vendor' | 'vendor_employee' | 'admin' | Filter by role (optional)
		role: role_example,
		// boolean | Filter by both email and phone verification status (optional)
		verified: true,
		// number | Page number (default: 1) (optional)
		page: 56,
		// number | Items per page (default: 50, max: 100) (optional)
		limit: 56
	} satisfies AdminUsersGetRequest;

	try {
		const data = await api.adminUsersGet(body);
		console.log(data);
	} catch (error) {
		console.error(error);
	}
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name         | Type                                                      | Description                                        | Notes                                                                                        |
| ------------ | --------------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **xLocale**  | `string`                                                  | Locale for response messages                       | [Optional] [Defaults to `undefined`]                                                         |
| **role**     | `client`, `courier`, `vendor`, `vendor_employee`, `admin` | Filter by role                                     | [Optional] [Defaults to `undefined`] [Enum: client, courier, vendor, vendor_employee, admin] |
| **verified** | `boolean`                                                 | Filter by both email and phone verification status | [Optional] [Defaults to `undefined`]                                                         |
| **page**     | `number`                                                  | Page number (default: 1)                           | [Optional] [Defaults to `undefined`]                                                         |
| **limit**    | `number`                                                  | Items per page (default: 50, max: 100)             | [Optional] [Defaults to `undefined`]                                                         |

### Return type

[**AdminListUsersResponse**](AdminListUsersResponse.md)

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

## adminUsersIdGet

> AdminAdminUserResponse adminUsersIdGet(id, xLocale)

Get user by ID (admin)

Get detailed information about a specific user

### Example

```ts
import { Configuration, AdminApi } from "";
import type { AdminUsersIdGetRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new AdminApi();

	const body = {
		// string | User ID (UUID)
		id: id_example,
		// string | Locale for response messages (optional)
		xLocale: xLocale_example
	} satisfies AdminUsersIdGetRequest;

	try {
		const data = await api.adminUsersIdGet(body);
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
| **id**      | `string` | User ID (UUID)               | [Defaults to `undefined`]            |
| **xLocale** | `string` | Locale for response messages | [Optional] [Defaults to `undefined`] |

### Return type

[**AdminAdminUserResponse**](AdminAdminUserResponse.md)

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

## adminUsersIdPatch

> AdminAdminUserResponse adminUsersIdPatch(id, body, xLocale)

Update user (admin)

Update user information including status, role, and verification status

### Example

```ts
import {
  Configuration,
  AdminApi,
} from '';
import type { AdminUsersIdPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AdminApi();

  const body = {
    // string | User ID (UUID)
    id: id_example,
    // AdminUpdateUserRequest | User update request
    body: ...,
    // string | Locale for response messages (optional)
    xLocale: xLocale_example,
  } satisfies AdminUsersIdPatchRequest;

  try {
    const data = await api.adminUsersIdPatch(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name        | Type                                                | Description                  | Notes                                |
| ----------- | --------------------------------------------------- | ---------------------------- | ------------------------------------ |
| **id**      | `string`                                            | User ID (UUID)               | [Defaults to `undefined`]            |
| **body**    | [AdminUpdateUserRequest](AdminUpdateUserRequest.md) | User update request          |                                      |
| **xLocale** | `string`                                            | Locale for response messages | [Optional] [Defaults to `undefined`] |

### Return type

[**AdminAdminUserResponse**](AdminAdminUserResponse.md)

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

## adminVehicleTypesIdDelete

> adminVehicleTypesIdDelete(id, xLocale)

Delete vehicle type (admin)

Delete a vehicle type

### Example

```ts
import { Configuration, AdminApi } from "";
import type { AdminVehicleTypesIdDeleteRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new AdminApi();

	const body = {
		// number | Vehicle type ID
		id: 56,
		// string | Locale for response messages (optional)
		xLocale: xLocale_example
	} satisfies AdminVehicleTypesIdDeleteRequest;

	try {
		const data = await api.adminVehicleTypesIdDelete(body);
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
| **id**      | `number` | Vehicle type ID              | [Defaults to `undefined`]            |
| **xLocale** | `string` | Locale for response messages | [Optional] [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description           | Response headers |
| ----------- | --------------------- | ---------------- |
| **204**     | No Content            | -                |
| **400**     | Bad Request           | -                |
| **401**     | Unauthorized          | -                |
| **403**     | Forbidden             | -                |
| **404**     | Not Found             | -                |
| **500**     | Internal Server Error | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## adminVehicleTypesIdGet

> AdminVehicleTypeResponse adminVehicleTypesIdGet(id, xLocale)

Get vehicle type by ID (admin)

Get detailed information about a specific vehicle type

### Example

```ts
import { Configuration, AdminApi } from "";
import type { AdminVehicleTypesIdGetRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new AdminApi();

	const body = {
		// number | Vehicle type ID
		id: 56,
		// string | Locale for response messages (optional)
		xLocale: xLocale_example
	} satisfies AdminVehicleTypesIdGetRequest;

	try {
		const data = await api.adminVehicleTypesIdGet(body);
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
| **id**      | `number` | Vehicle type ID              | [Defaults to `undefined`]            |
| **xLocale** | `string` | Locale for response messages | [Optional] [Defaults to `undefined`] |

### Return type

[**AdminVehicleTypeResponse**](AdminVehicleTypeResponse.md)

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

## adminVehicleTypesIdPut

> AdminVehicleTypeResponse adminVehicleTypesIdPut(id, vehicleType, xLocale)

Update vehicle type (admin)

Update an existing vehicle type

### Example

```ts
import {
  Configuration,
  AdminApi,
} from '';
import type { AdminVehicleTypesIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AdminApi();

  const body = {
    // number | Vehicle type ID
    id: 56,
    // AdminUpdateVehicleTypeRequest | Updated vehicle type data
    vehicleType: ...,
    // string | Locale for response messages (optional)
    xLocale: xLocale_example,
  } satisfies AdminVehicleTypesIdPutRequest;

  try {
    const data = await api.adminVehicleTypesIdPut(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name            | Type                                                              | Description                  | Notes                                |
| --------------- | ----------------------------------------------------------------- | ---------------------------- | ------------------------------------ |
| **id**          | `number`                                                          | Vehicle type ID              | [Defaults to `undefined`]            |
| **vehicleType** | [AdminUpdateVehicleTypeRequest](AdminUpdateVehicleTypeRequest.md) | Updated vehicle type data    |                                      |
| **xLocale**     | `string`                                                          | Locale for response messages | [Optional] [Defaults to `undefined`] |

### Return type

[**AdminVehicleTypeResponse**](AdminVehicleTypeResponse.md)

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

## adminVehicleTypesPost

> AdminVehicleTypeResponse adminVehicleTypesPost(vehicleType, xLocale)

Create vehicle type (admin)

Create a new vehicle type with specifications

### Example

```ts
import {
  Configuration,
  AdminApi,
} from '';
import type { AdminVehicleTypesPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AdminApi();

  const body = {
    // AdminCreateVehicleTypeRequest | Vehicle type data
    vehicleType: ...,
    // string | Locale for response messages (optional)
    xLocale: xLocale_example,
  } satisfies AdminVehicleTypesPostRequest;

  try {
    const data = await api.adminVehicleTypesPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name            | Type                                                              | Description                  | Notes                                |
| --------------- | ----------------------------------------------------------------- | ---------------------------- | ------------------------------------ |
| **vehicleType** | [AdminCreateVehicleTypeRequest](AdminCreateVehicleTypeRequest.md) | Vehicle type data            |                                      |
| **xLocale**     | `string`                                                          | Locale for response messages | [Optional] [Defaults to `undefined`] |

### Return type

[**AdminVehicleTypeResponse**](AdminVehicleTypeResponse.md)

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

## adminVendorsGet

> AdminListVendorsResponse adminVendorsGet(xLocale, status, page, limit)

List vendors (admin)

Get a paginated list of vendors with optional filters

### Example

```ts
import { Configuration, AdminApi } from "";
import type { AdminVendorsGetRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new AdminApi();

	const body = {
		// string | Locale for response messages (optional)
		xLocale: xLocale_example,
		// string | Filter by status (optional)
		status: status_example,
		// number | Page number (default: 1) (optional)
		page: 56,
		// number | Items per page (default: 50, max: 100) (optional)
		limit: 56
	} satisfies AdminVendorsGetRequest;

	try {
		const data = await api.adminVendorsGet(body);
		console.log(data);
	} catch (error) {
		console.error(error);
	}
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name        | Type     | Description                            | Notes                                |
| ----------- | -------- | -------------------------------------- | ------------------------------------ |
| **xLocale** | `string` | Locale for response messages           | [Optional] [Defaults to `undefined`] |
| **status**  | `string` | Filter by status                       | [Optional] [Defaults to `undefined`] |
| **page**    | `number` | Page number (default: 1)               | [Optional] [Defaults to `undefined`] |
| **limit**   | `number` | Items per page (default: 50, max: 100) | [Optional] [Defaults to `undefined`] |

### Return type

[**AdminListVendorsResponse**](AdminListVendorsResponse.md)

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

## adminVendorsIdApprovePost

> HttputilsSuccessResponse adminVendorsIdApprovePost(id, xLocale)

Approve vendor (admin)

Approve a pending vendor and create their Stripe Connect account

### Example

```ts
import { Configuration, AdminApi } from "";
import type { AdminVendorsIdApprovePostRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new AdminApi();

	const body = {
		// string | Vendor ID (UUID)
		id: id_example,
		// string | Locale for response messages (optional)
		xLocale: xLocale_example
	} satisfies AdminVendorsIdApprovePostRequest;

	try {
		const data = await api.adminVendorsIdApprovePost(body);
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

## adminVendorsIdDenyPost

> HttputilsSuccessResponse adminVendorsIdDenyPost(id, xLocale)

Deny vendor (admin)

Deny a pending vendor

### Example

```ts
import { Configuration, AdminApi } from "";
import type { AdminVendorsIdDenyPostRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new AdminApi();

	const body = {
		// string | Vendor ID (UUID)
		id: id_example,
		// string | Locale for response messages (optional)
		xLocale: xLocale_example
	} satisfies AdminVendorsIdDenyPostRequest;

	try {
		const data = await api.adminVendorsIdDenyPost(body);
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

## adminVendorsIdDocumentsTypeGet

> Blob adminVendorsIdDocumentsTypeGet(id, type, xLocale)

Get vendor document (admin)

Download/view a specific document for a vendor (admin only, GDPR compliant)

### Example

```ts
import { Configuration, AdminApi } from "";
import type { AdminVendorsIdDocumentsTypeGetRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new AdminApi();

	const body = {
		// string | Vendor ID (UUID)
		id: id_example,
		// string | Document type (identity_card, kbis, insurance)
		type: type_example,
		// string | Locale for response messages (optional)
		xLocale: xLocale_example
	} satisfies AdminVendorsIdDocumentsTypeGetRequest;

	try {
		const data = await api.adminVendorsIdDocumentsTypeGet(body);
		console.log(data);
	} catch (error) {
		console.error(error);
	}
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name        | Type     | Description                                    | Notes                                |
| ----------- | -------- | ---------------------------------------------- | ------------------------------------ |
| **id**      | `string` | Vendor ID (UUID)                               | [Defaults to `undefined`]            |
| **type**    | `string` | Document type (identity_card, kbis, insurance) | [Defaults to `undefined`]            |
| **xLocale** | `string` | Locale for response messages                   | [Optional] [Defaults to `undefined`] |

### Return type

**Blob**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/octet-stream`

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

## adminVendorsIdGet

> AdminAdminVendorResponse adminVendorsIdGet(id, xLocale)

Get vendor by ID (admin)

Get a specific vendor by their ID (admin only)

### Example

```ts
import { Configuration, AdminApi } from "";
import type { AdminVendorsIdGetRequest } from "";

async function example() {
	console.log("🚀 Testing  SDK...");
	const api = new AdminApi();

	const body = {
		// string | Vendor ID (UUID)
		id: id_example,
		// string | Locale for response messages (optional)
		xLocale: xLocale_example
	} satisfies AdminVendorsIdGetRequest;

	try {
		const data = await api.adminVendorsIdGet(body);
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

[**AdminAdminVendorResponse**](AdminAdminVendorResponse.md)

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
