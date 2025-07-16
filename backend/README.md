# Preface

For each controller or route ensure that it is tested locally, free of syntax errors and properly documented.

#### Routes

"Routes are the names of the endpoints that will be used to comunicate with the frontend. For example, in 'https://localhost:3000/pets', '/pets' is the route name. The route files will be organized in the 'routes' folder."

When creating a route file, use the name of the controlled followed with "route.js" example auth.route.js

#### Controllers

Controllers are responsible for handling requests, such as validating whether a username is already in use or checking if a pet species exists. They also verify if the data is being correctly stored in the database. All controller files are organized in the 'controllers' folder.

When creating a controller file, use the name of the controlled followed with "controller.js" example auth.controller.js

#### Models

Models handle the connection to database for CREATE, READ, UPDATE, DELETE data. All model files are organized in the 'model' folder.

When creating a model file, use the name of the entity followed with "model.js" example auth.model.js


#### Database Schema

This ER diagram shows how the database is structured:

![Database Schema](https://raw.githubusercontent.com/freeCodeCamp-2025-Summer-Hackathon/yellow-packet/refs/heads/main/doc/Database_diagram.jpg)

#### Schema:

Users: Someone who can log in to PetMatch (adopters and shelters).

```javascript
  "users": {
    "username": "string",
    "password": "string",
    "role": "string"
  },
```

adopter_profile: User information.

```javascript
  "adopter_profile": {
    "user_id": "int",
    "first_name": "string",
    "last_name": "string",
    "phone_number": "string",
    "email": "string",
    "bio": "string",
    "city": "string",
    "state": "string",
    "address_line_1": "string",
    "address_line_2": "string",
    "zip_code": "string",
    "gender": "string",
    "pronouns": "string",
    "birthday": "date"
  },
```

shelter_profile: shelter owner information.

```javascript
  "shelter_profile": {
    "user_id": "int",
    "shelter_name": "string",
    "phone_number": "string",
    "email": "string",
    "zip_code": "string",
    "bio": "string",
    "city": "string",
    "state": "string",
    "address_line_1": "string",
    "address_line_2": "string",
    "years_active": "int"
  },
```

pet_profile: Shelter owner add the pets they want to put up for adoption.

```javascript
  "pet_profile": {
    "pet_uid": "int",
    "shelter_id": "int",
    "species": "string",
    "sex": "string",
    "years": "int",
    "weight": "float",
    "date_birth": "date",
    "illness_disabilities": "string",
    "personality": "string",
    "photo_link": "string",
    "bio": "string",
    "spayed/neutered": "boolean",
  },
```

request: Users can submit a request to adopt the desired pet.

```javascript
  "request": {
    "user_id": "int",
    "first_name": "string",
    "last_name": "string",
    "phone_number": "string",
    "email": "string",
    "city": "string",
    "bio": "string"
  }
```

# Structure Overview

```
backend/
├── controllers/
│   └── auth.controller.js
├── routes/
│   └── auth.route.js
├── server.js
├── swagger.js
├── package.json         
└── README.md      
```

# Workflow Hierarchy


Click a file to read its description.

[backend]
├── [package.json](#packagejson)  
├── [package-lock.json]
├── [controllers]  
|   └── [auth.controller.js](#authcontrollerjs)  
|── [routes]
|   └── [auth.route.js](#authroutejs)
├── [README.md] 
├── [server.js](#serverjs)  
├── [swagger.js](#swaggerjs)


# File Description

### package.json
Handles libraries and project-related scripts or commands.

### auth.controller.js
Handles Sign Up and Sign In validations and waits for the databases interactions from the models.

### auth.route.js
The name of the endpoints that the frontend will communicate with. There are three routes.
    - /login
    - /signup
    - /logout

### server.js
Where node.js loads all files and server configurations such as hostname, port, environment variables, and more.

### swagger.js
Automatically generates API documentation from your code.