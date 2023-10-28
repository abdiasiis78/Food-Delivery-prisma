
# Food Ordering and Delivery Service App Backend

Welcome to the backend API documentation for the Food Ordering and Delivery Service app. This documentation provides information on how to interact with our API to create, manage, and retrieve data related to food orders, menus, user accounts, and user feedback.

## Base URL

The base URL for this API is: `https://food-delivery-application-backend.onrender.com`


## Authentication

This API uses JSON Web Tokens (JWT) for authentication. To access protected endpoints, you must include the `Authorization` header in your requests with the value `Bearer <token>`, where `<token>` is the JWT obtained during the login process.

## Endpoints

## Owner Management
This section outlines the endpoints related to owner management. These endpoints allow you to create, update, retrieve, and delete owner information.

### Registration

#### Register a New Owner

**Endpoint:** `POST /api/owner/signup`

##### Request Body

| Parameter  | Type   | Required | Description               |
| ---------- | ------ | -------- | ------------------------- |
| `name`     | string | Yes      | Name of the owner        |
| `email`    | string | Yes      | Email of the owner       |
| `password` | string | Yes      | Password for the owner's account |
| `username` | string | Yes      | Username of the owner    |

##### Response

```json
{
  "message": "Owner created successfully",
  "owner": Owner data
}
```

### Authentication

#### Owner Login

Authenticate an owner and obtain a JWT token.

**Endpoint:** `POST /api/owner/login`

##### Request Body

| Parameter  | Type   | Required | Description                          |
| ---------- | ------ | -------- | ------------------------------------ |
| `email`    | string | Yes      | Email of the owner                   |
| `password` | string | Yes      | Password for the owner's account     |

##### Response

```json
{
  "message": "Owner logged in successfully",
  "token": "<jwt_token>"
}
```

### Update Owner Information

**Endpoint:** `PUT /api/owner/:id`

**Authentication:** Requires a valid JWT token.

Update the information about an existing owner.

##### Request Body

| Parameter  | Type   | Required | Description                               |
| ---------- | ------ | -------- | ----------------------------------------- |
| `name`     | string | No       | New name of the owner (optional)           |
| `email`    | string | No       | New email address (optional)              |
| `username` | string | No       | New username (optional)                   |
| `password` | string | No       | New password (optional)                   |

##### Response

```json
{
  "message": "Owner information updated successfully",
  "owner": Updated Owner data
}
```

### Delete Owner

**Endpoint:** `DELETE /api/owner/:id`

Delete an owner's account.

**Authentication:** authentication required.

##### Response

- `200 OK`: Owner deleted successfully
- `404 Not Found`: Owner was not found

### Retrieve Owner Information

**Endpoint:** `GET /api/owner/:id`

Retrieve information about a specific owner.

**Authentication:** No authentication required.

##### Response

```json
{
  "message": "Owner information retrieved successfully",
  "owner": Owner data
}
```

### List Owners

**Endpoint:** `GET /api/owner`

Retrieve a list of all owners.

**Authentication:** No authentication required.

##### Response

```json
{
  "message": "Owners list retrieved successfully",
  "owners": [List of Owner data]
}
```

