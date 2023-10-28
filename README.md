
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
This documentation provides an overview of the owner-management endpoints. For more details on how to use these endpoints and additional features, please refer to the full API documentation







This section outlines the endpoints related to user management. These endpoints allow you to create, update, retrieve, and delete user accounts.

### Registration

#### Register a New User

**Endpoint:** `POST /api/user/signup`

Create a new user account.

##### Request Body

| Parameter       | Type   | Required | Description                             |
| --------------- | ------ | -------- | --------------------------------------- |
| `name`          | string | Yes      | Name of the user                         |
| `username`      | string | Yes      | Username of the user                     |
| `email`         | string | Yes      | Email address of the user               |
| `password`      | string | Yes      | Password for the user's account         |
| `profileImage`  | string | No       | URL to the user's profile image (optional) |

##### Response

```json
{
  "message": "User created successfully",
  "user": New User data
}
```

### Authentication

#### User Login

Authenticate a user and obtain a JWT token.

**Endpoint:** `POST /api/user/login`

##### Request Body

| Parameter  | Type   | Required | Description                             |
| ---------- | ------ | -------- | --------------------------------------- |
| `email`    | string | Yes      | Email of the user                       |
| `password` | string | Yes      | Password for the user's account         |

##### Response

```json
{
  "message": "User logged in successfully",
  "token": "<jwt_token>"
}
```

### Update User Information

**Endpoint:** `PUT /api/user/:id`

**Authentication:** Requires a valid JWT token.

Update the information of an existing user.

##### Request Body

| Parameter      | Type   | Required | Description                               |
| -------------  | ------ | -------- | ----------------------------------------- |
| `name`         | string | No       | New name of the user (optional)           |
| `username`     | string | No       | New username (optional)                   |
| `email`        | string | No       | New email address (optional)              |
| `password`     | string | No       | New password (optional)                  |
| `profileImage` | string | No       | New URL to the user's profile image (optional) |

##### Response

```json
{
  "message": "User information updated successfully",
  "user": Updated User data
}
```

### Delete User

**Endpoint:** `DELETE /api/user/:id`

Delete a user's account.

**Authentication:** Requires a valid JWT token.

##### Response

- `200 OK`: User deleted successfully
- `404 Not Found`: User was not found

### Retrieve User Information

**Endpoint:** `GET /api/user/:id`

Retrieve information about a specific user.

**Authentication:** No authentication required.

##### Response

```json
{
  "message": "User information retrieved successfully",
  "user": User data
}
```

### List Users

**Endpoint:** `GET /api/user`

Retrieve a list of all users.

**Authentication:** No authentication required.

##### Response

```json
{
  "message": "Users list retrieved successfully",
  "users": [List of User data]
}
```

This documentation provides an overview of the user management endpoints. For more details on how to use these endpoints and additional features, please refer to the full API documentation.





