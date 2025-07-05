<!-- Generator: Widdershins v4.0.1 -->

<h1 id="petmatch-api">PetMatch API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

API documentation for PetMatch project

Base URLs:

* <a href="http://localhost:5000">http://localhost:5000</a>

# Authentication

- HTTP Authentication, scheme: bearer 

<h1 id="petmatch-api-general">General</h1>

General API endpoints

## Health check endpoint

> Code samples

`GET /`

> Example responses

> 200 Response

```json
{
  "message": "API is running"
}
```

<h3 id="health-check-endpoint-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|API is running|Inline|

<h3 id="health-check-endpoint-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="petmatch-api-authentication">Authentication</h1>

## User login

> Code samples

`POST /api/auth/login`

Authenticate a user with email and password

> Body parameter

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

<h3 id="user-login-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[LoginRequest](#schemaloginrequest)|true|none|

> Example responses

> 200 Response

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "12345",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "jwt-token-here"
}
```

<h3 id="user-login-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Login successful|[LoginResponse](#schemaloginresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request - missing email or password|Inline|

<h3 id="user-login-responseschema">Response Schema</h3>

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» success|boolean|false|none|none|
|» message|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_User">User</h2>
<!-- backwards compatibility -->
<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "id": "12345",
  "email": "user@example.com",
  "name": "John Doe"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|email|string(email)|false|none|none|
|name|string|false|none|none|

<h2 id="tocS_LoginRequest">LoginRequest</h2>
<!-- backwards compatibility -->
<a id="schemaloginrequest"></a>
<a id="schema_LoginRequest"></a>
<a id="tocSloginrequest"></a>
<a id="tocsloginrequest"></a>

```json
{
  "email": "user@example.com",
  "password": "password123"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string(email)|true|none|none|
|password|string|true|none|none|

<h2 id="tocS_LoginResponse">LoginResponse</h2>
<!-- backwards compatibility -->
<a id="schemaloginresponse"></a>
<a id="schema_LoginResponse"></a>
<a id="tocSloginresponse"></a>
<a id="tocsloginresponse"></a>

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "12345",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "jwt-token-here"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|success|boolean|false|none|none|
|message|string|false|none|none|
|user|[User](#schemauser)|false|none|none|
|token|string|false|none|none|

