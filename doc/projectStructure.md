# PROJECT STRUCTURE

```
├── README.md
├── backend
│   ├── controllers
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── routes
│   └── server.js
├── doc
│   ├── git_workflow.md
│   └── images
└── frontend
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── public
    ├── src
    └── vite.config.js
```

## HOW TO RUN LOCALLY IN BROWSER:

### FrontEnd Setup

Change directory into frontend folder by typing:
```
  cd frontend
```

Install dependencies:
  ```npm install```

Run development server:
  ```npm run dev```


### BackEnd Setup

Change directory into backend folder by typing:
```
  cd backend
```

Install dependencies:
  ```npm install```

Run development server:
  ```npm run dev```


## Check Routes

### Navigate these URLs in your browser:

| URL                                          | Description               |
|----------------------------------------------|---------------------------|
| [http://localhost:5000/api/auth/](http://localhost:5000/api/auth/)             | // Hello World!           |
| [http://localhost:5000/api/auth/signup](http://localhost:5000/api/auth/signup) | // Signup Route CALLED    |
| [http://localhost:5000/api/auth/login](http://localhost:5000/api/auth/login)   | // Login Route CALLED     |
| [http://localhost:5000/api/auth/logout](http://localhost:5000/api/auth/logout) | // Logout Route CALLED    |
