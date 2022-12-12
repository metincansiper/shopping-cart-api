# Shopping Cart API
![Node.js CI](https://github.com/metincansiper/shopping-cart-api/actions/workflows/build.yaml/badge.svg)

- A configurable Restful shopping cart API build using Typescript, Node.js, Express.js, MongoDB, Mongoose, and Joi.
- Strictly followed SOLID design principles.
- Used clean architecture to ensure that the business logic is independent of external agents.
- Databases, frameworks, and the other technologies can easily be changed without disrupting the entire system.
- Proved the external independence of the system by adding a configuration option to switch the data storage strategy between using MongoDB and memory.

## Required software
- [Node.js](https://nodejs.org/en/) >=15
- [RethinkDB](http://rethinkdb.com/) ^6.0.1

## Configuration

The following environment variables can be used to configure the server:

- `PORT` : The port on which the server runs (default `3000`)
- `DATASTORE` : The datastore to serve te data. Options are `mongodb` (the default) and `inmemory`
- `MONGO_HOST` : Hostname or ip address of the mongodb host (default `mongodb://127.0.0.1`)
- `MONGO_PORT` : Port where the db can be accessed (default `27017`)
- `MONGO_DATABASE`: Name of the mongo database (default `shoppingcart`)

## Run targets
- `npm run start` : Start the server
- `npm run build` : Build project
- `npm run test` : Run tests

## Running the project

- Install the required software
- Change directory to the root folder of the project
- Run `npm install`
- Run `npm run start`

