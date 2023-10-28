# food ordering and delivery service app backend 

``BASE_URL = https://food-delivery-application-backend.onrender.com``


##  usage of endpoints ↓

## Authentication

This API uses JSON Web Tokens (JWT) for authentication. To access protected endpoints, include the `Authorization` header in your requests with the value `Bearer <token>`, where `<token>` is the JWT obtained during the login process.

Register a new Owner

**Endpoint:** `POST /api/owner/signup`
#### Request Body

| Parameter      | Type     | Required | Description                   |
| -------------- | ------   | -------- | ------------------------------ |
| `name`         | string   | Yes      | name of the owner |
| `email`        | string   | Yes      | Email of the owner.   |
| `password`     | string   | Yes      | Password for the owners's account |
| `username`     | string   | Yes      | userName of the owner.|

#### Response

```json
{
 "message": "owner creation successfully",
  "owner": Owner data
}
```



### owner Login

Authenticate a owner and obtain a JWT token.

**Endpoint:** `POST /api/owner/login`

#### Request Body

| Parameter      | Type   | Required | Description                             |
| -------------- | ------ | -------- | --------------------------------------- |
| `email`        | string | Yes      | Email of the owner.                   |
| `password`     | string | Yes      | Password for the owners's account.      |

#### Response

```json
{
  "message": "owner logedin successfully",
  "token": "<jwt_token>"
}
```




