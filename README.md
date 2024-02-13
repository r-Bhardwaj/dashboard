# API Documentation

## Overview

This API provides a set of endpoints for managing items, categories, tags, and user authentication within an application. It uses RESTful principles and supports operations such as retrieving, creating, updating, and deleting resources. Authentication is handled via session and token-based methods, ensuring that only authenticated users can access certain endpoints.

## Authentication

- **Signup**: `POST /signup/`
  - Register a new user and obtain an authentication token.
- **Login**: `POST /login/`
  - Authenticate a user and retrieve an authentication token.
- **Forgot Password**: `POST /forgotPassword/`
  - Request a password reset link to be sent to the user's email.
- **Reset Password**: `POST /resetPassword/{username}`
  - Reset the password for the user with the given username.

## Items

- **List Items**: `GET /items/`
  - Retrieve a list of all items.
- **Create Item**: `POST /items/`
  - Create a new item.
- **Item Detail**: `GET /items/{id}`
  - Retrieve details of a specific item.
- **Update Item**: `PUT /items/{id}`
  - Update an existing item.
- **Delete Item**: `DELETE /items/{id}`
  - Delete a specific item.

## Categories

- **List Categories**: `GET /category/`
  - Retrieve a list of all categories.
- **Create Category**: `POST /category/`
  - Create a new category.

## Tags

- **List Tags**: `GET /tag/`
  - Retrieve a list of all tags.

## Permissions

Endpoints that modify resources require the user to be authenticated. The API uses `SessionAuthentication` and `TokenAuthentication` to verify the identity of users. Permissions are managed using the `IsAuthenticated` permission class.

## Error Handling

Responses from the API include appropriate HTTP status codes. For example, successful requests return a `200 OK` or `201 Created` status, while unsuccessful requests return error codes such as `400 Bad Request`, `404 Not Found`, or `409 Conflict` along with error details.

## Usage

To interact with the API, clients should send HTTP requests with the required HTTP method (`GET`, `POST`, `PUT`, `DELETE`) and necessary headers (e.g., `Authorization` for authenticated endpoints). Request and response bodies are typically formatted in JSON.

---

**Note**: Replace `http://localhost:8000` with the actual base URL of your API deployment. The email address `kaizantreeapp@outlook.com` used in the `forgotPassword/` endpoint should be replaced with the actual email address from which password reset emails will be sent.
