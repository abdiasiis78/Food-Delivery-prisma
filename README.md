
# Food Ordering and Delivery Service App

Our backend API powers a seamless food ordering and delivery platform. It enables user registration, restaurant and menu management, ratings, and order processing, all secured with JWT authentication. Scalable and user-friendly, it streamlines the food delivery experience.


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





# User Management

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




# Restaurant Management

This section outlines the endpoints related to restaurant management. These endpoints allow you to create, update, retrieve, and delete restaurant information.

### Create a New Restaurant

**Endpoint:** `POST /api/restaurant`

**Authentication:** Requires a valid JWT token.

Create a new restaurant.

##### Request Body

| Parameter     | Type   | Required | Description                             |
| ------------ | ------ | -------- | --------------------------------------- |
| `name`       | string | Yes      | Name of the restaurant                   |
| `address`    | string | Yes      | Address of the restaurant                |
| `cuisineType`| string | Yes      | Cuisine type of the restaurant           |
| `ownerId`    | number | Yes      | ID of the restaurant owner               |

##### Response

```json
{
  "message": "Restaurant created successfully",
  "restaurant": New Restaurant data
}
```

### Update Restaurant Information

**Endpoint:** `PUT /api/restaurant/:id`

**Authentication:** Requires a valid JWT token.

Update the information of an existing restaurant.

##### Request Body

| Parameter     | Type   | Required | Description                            |
| ------------ | ------ | -------- | --------------------------------------- |
| `name`       | string | Yes      | New name of the restaurant (optional)   |
| `address`    | string | Yes      | New address (optional)                  |
| `cuisineType`| string | Yes      | New cuisine type (optional)             |
| `ownerId`    | number | Yes      | New owner ID (optional)                |

##### Response

```json
{
  "message": "Restaurant information updated successfully",
  "restaurant": Updated Restaurant data
}
```

### List Restaurants

**Endpoint:** `GET /api/restaurant`

Retrieve a list of all restaurants.

**Authentication:** No authentication required.

##### Response

```json
{
  "message": "Restaurants information retrieved successfully",
  "restaurants": [List of Restaurant data]
}
```

### Retrieve Restaurant Information

**Endpoint:** `GET /api/restaurant/:id`

Retrieve information about a specific restaurant.

**Authentication:** No authentication required.

##### Response

```json
{
  "message": "Restaurant information retrieved successfully",
  "restaurant": Restaurant data
}
```

### Delete Restaurant

**Endpoint:** `DELETE /api/restaurant/:id`

Delete a restaurant.

**Authentication:** Requires a valid JWT token.

##### Response

- `200 OK`: Restaurant deleted successfully
- `404 Not Found`: Restaurant was not found

This documentation provides an overview of the restaurant management endpoints. For more details on how to use these endpoints and additional features, please refer to the full API documentation.




# Menu Item Management

This section outlines the endpoints related to menu item management. These endpoints allow you to create, update, retrieve, and delete menu item information.

### Create a New Menu Item

**Endpoint:** `POST /api/menuitem`

**Authentication:** Requires a valid JWT token.

Create a new menu item.

##### Request Body

| Parameter       | Type   | Required | Description                             |
| --------------- | ------ | -------- | --------------------------------------- |
| `name`          | string | Yes      | Name of the menu item                   |
| `description`   | string | Yes      | Description of the menu item            |
| `price`         | number | Yes      | Price of the menu item                  |
| `restaurantId`  | number | Yes      | ID of the restaurant associated with the menu item |
| `dietaryInfo`   | string | No       | Dietary information for the menu item (optional) |

##### Response

```json
{
  "message": "Menu item created successfully",
  "menuItem": New Menu Item data
}
```

### Update Menu Item Information

**Endpoint:** `PUT /api/menuitem/:id`

**Authentication:** Requires a valid JWT token.

Update the information of an existing menu item.

##### Request Body

| Parameter       | Type   | Required | Description                             |
| --------------- | ------ | -------- | --------------------------------------- |
| `name`          | string | Yes      | New name of the menu item (optional)   |
| `description`   | string | Yes      | New description (optional)              |
| `price`         | number | Yes      | New price (optional)                   |
| `restaurantId`  | number | Yes      | New restaurant ID (optional)           |
| `dietaryInfo`   | string | No       | New dietary information (optional)     |

##### Response

```json
{
  "message": "Menu item information updated successfully",
  "menuItem": Updated Menu Item data
}
```

### List Menu Items

**Endpoint:** `GET /api/menuitem`

Retrieve a list of all menu items.

**Authentication:** No authentication required.

##### Response

```json
{
  "message": "Menu items information retrieved successfully",
  "menuItems": [List of Menu Item data]
}
```

### Retrieve Menu Item Information

**Endpoint:** `GET /api/menuitem/:id`

Retrieve information about a specific menu item.

**Authentication:** No authentication required.

##### Response

```json
{
  "message": "Menu item information retrieved successfully",
  "menuItem": Menu Item data
}
```

### Delete Menu Item

**Endpoint:** `DELETE /api/menuitem/:id`

Delete a menu item.

**Authentication:** Requires a valid JWT token.

##### Response

- `200 OK`: Menu item deleted successfully
- `404 Not Found`: Menu item was not found

This documentation provides an overview of the menu item management endpoints. For more details on how to use these endpoints and additional features, please refer to the full API documentation.




# Order Management

This section outlines the endpoints related to order management. These endpoints allow you to create, update, retrieve, and delete order information.

### Create a New Order

**Endpoint:** `POST /api/order`

**Authentication:** Requires a valid JWT token.

Create a new order.

##### Request Body

| Parameter        | Type      | Required | Description                             |
| ---------------  | --------- | -------- | --------------------------------------- |
| `orderDate`      | datetime  | Yes      | Date and time of the order              |
| `deliveryAddress`| string    | Yes      | Delivery address for the order          |
| `totalPrice`     | number    | Yes      | Total price of the order                |
| `status`         | string    | No       | Order status (default: PROCESSING)      |
| `menuItemId`     | number    | Yes      | ID of the menu item associated with the order |
| `userId`         | number    | Yes      | ID of the user who placed the order     |

##### Response

```json
{
  "message": "We are preparing your delicious food.",
  "order": New Order data
}
```

### Update Order Status to DELIVERING

**Endpoint:** `PUT /api/order/delivering/:id`

**Authentication:** Requires a valid JWT token.

Update the status of an order to "DELIVERING."

##### Response

```json
{
  "message": "Order is now being delivering.",
  "order": Updated Order data
}
```

### Update Order Status to DELIVERED

**Endpoint:** `PUT /api/order/delivered/:id`

**Authentication:** Requires a valid JWT token.

Update the status of an order to "DELIVERED."

##### Response

```json
{
  "message": "Order has been successfully delivered.",
  "order": Updated Order data
}
```

### Retrieve Order Information

**Endpoint:** `GET /api/order/:id`

Retrieve information about a specific order.

**Authentication:** Requires a valid JWT token.

##### Response

```json
{
  "message": "Order retrieved successfully",
  "order": Order data
}
```

### List Orders

**Endpoint:** `GET /api/order`

Retrieve a list of all orders.

**Authentication:** Requires a valid JWT token.

##### Response

```json
{
  "message": "Orders retrieved successfully",
  "orders": [List of Order data]
}
```

### Delete Order

**Endpoint:** `DELETE /api/order/:id`

Delete an order.

**Authentication:** Requires a valid JWT token.

##### Response

```json
{
  "message": "Order deleted successfully",
  "order": Deleted Order data
}
```

This documentation provides an overview of the order management endpoints. For more details on how to use these endpoints and additional features, please refer to the full API documentation.


# Rating Management

This section outlines the endpoints related to rating management. These endpoints allow you to create, update, retrieve, and delete ratings.

### Create a New Rating

**Endpoint:** `POST /api/rating`

**Authentication:** Requires a valid JWT token.

Create a new rating.

##### Request Body

| Parameter      | Type     | Required | Description                              |
| -------------- | -------  | -------- | ---------------------------------------- |
| `text`         | string   | Yes      | Feedback text or comment                |
| `rating`       | number   | Yes      | Numeric rating value                     |
| `restaurantId` | number   | Yes      | ID of the restaurant associated with the rating |
| `userId`       | number   | Yes      | ID of the user who provided the rating   |
| `menuItemId`   | number   | Yes      | ID of the menu item associated with the rating |

##### Response

```json
{
  "message": "Rating created successfully",
  "rating": New Rating data
}
```

### Update a Rating

**Endpoint:** `PUT /api/rating/:id`

**Authentication:** Requires a valid JWT token.

Update an existing rating.

##### Request Body

| Parameter      | Type     | Required | Description                              |
| -------------- | -------  | -------- | ---------------------------------------- |
| `text`         | string   | Yes      | Updated feedback text or comment        |
| `rating`       | number   | Yes      | Updated numeric rating value             |
| `restaurantId` | number   | Yes      | Updated ID of the restaurant associated with the rating |
| `userId`       | number   | Yes      | Updated ID of the user who provided the rating |
| `menuItemId`   | number   | Yes      | Updated ID of the menu item associated with the rating |

##### Response

```json
{
  "message": "Rating updated successfully",
  "rating": Updated Rating data
}
```

### Retrieve Rating Information

**Endpoint:** `GET /api/rating/:id`

Retrieve information about a specific rating.

##### Response

```json
{
  "message": "Rating retrieved successfully",
  "rating": Rating data
}
```

### List Ratings

**Endpoint:** `GET /api/rating`

Retrieve a list of all ratings.

##### Response

```json
{
  "message": "Ratings retrieved successfully",
  "ratings": [List of Rating data]
}
```

This documentation provides an overview of the rating management endpoints. For more details on how to use these endpoints and additional features, please refer to the full API documentation.

