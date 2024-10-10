# CashRegisterAngularApp

## Backend
```
backend/
  |___database
  |___controllers ---> refers to the action handlers
  |___middleware ----> functions which stays between the req and the response
  |___modals --------> data structure used in the application
  |___routes
```

Steps:
1) Create the backend folder, `node init` and add dependencies: `express`, `cors`, `body-parser`, `nodemon`, `dotenv`, `mongoose`.

2) Create index.js and initialize a simple express server.

3) Create `.env` file which works with the dep _dotenv_. Add the _PORT_ variable as `KEY=value` pair. In `index.js` it is possible to use it with `require('dotenv').config()` and accessible through `process.env.PORT`.

4) Install mongoDB and create a new database, a new collection, and import data. Use `mongoose` to connect to mongoDB with node, export the connection into index.js. Update the `.env` file with _URL_ variable of the database, which is possible to use. _Attention:_ you need to connect to the mongodb server **AND** the specific database!

5) Add Schemas of Data Structure used in the application.

6) Setup the _router_ with the associated method (ex. `.get()`) and create the related _controller_. The controller has the responsability to handle that method, processing the request (for example getting the data, posting something new, or updating the existent one).

7) Add cors, to allow connection from the frontend.

## Set up a get request in Angular18
1) Create a service whose job is to simple send the Http request. This request is done inside a class method, like `getAll()`.
2) The service is used as an argument in the constructor of the related component; the component will call the `getAll()` function and `.subscribe()`
