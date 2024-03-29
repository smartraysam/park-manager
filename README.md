# Final Project: Park Management System
#### `Back-end` `JavaScript` `ES6` `NoSQL` `MongoDB` `Redis` `NodeJS` `ExpressJS` `Kue`

This project is a summary of this back-end trimester: `authentication`, `NodeJS`, `MongoDB`, `Redis`, `pagination`, `Notification`, `Socket.io`, `Swagger`, `JWT` and `background processing`.

The objective is to **build a simple platform to upload and view files**:

* User authentication via a token


You will be guided step by step for building it, but you have some freedoms of implementation, split in more files etc… ([utils](./utils) folder will be your friend)

Of course, this kind of service already exists in the real life - it’s a learning purpose to assemble each piece and build a full product.

Enjoy!

## Resources
### Read or watch:

* Node JS getting started
* Express getting started
* Swagger documentation
* Nodemon documentation
* MongoDB
* Websocket
* Socket.io
* Redis



### and...
Don’t forget to run `$ npm install` when you have the `package.json`

## Tasks

[0. Redis utils](./utils/redis.js)

Inside the folder `utils`, create a file `redis.js` that contains the class `RedisClient`.

`RedisClient` should have:

* the constructor that creates a client to Redis:
	* any error of the redis client must be displayed in the console (you should use `on('error')` of the redis client)
* a function `isAlive` that returns true when the connection to Redis is a success otherwise, `false`
* an asynchronous function `get` that takes a string key as argument and returns the Redis value stored for this key
* an asynchronous function `set` that takes a string key, a value and a duration in second as arguments to store it in Redis (with an expiration set by the duration argument)
* an asynchronous function `del` that takes a string key as argument and remove the value in Redis for this key

After the class definition, create and export an instance of `RedisClient` called `redisClient`.

[1. MongoDB utils](./utils/db.js)

Inside the folder `utils`, create a file `db.js` that contains the class `DBClient`.

`DBClient` should have:

* the constructor that creates a client to MongoDB:
	* host: from the environment variable `DB_HOST` or default: `localhost`
	* port: from the environment variable `DB_PORT` or default: `27017`
	* database: from the environment variable `DB_DATABASE` or default: `files_manager`
* a function `isAlive` that returns `true` when the connection to MongoDB is a success otherwise, `false`
* an asynchronous function `nbUsers` that returns the number of documents in the collection `users`
* an asynchronous function `nbFiles` that returns the number of documents in the collection `files`

After the class definition, create and export an instance of `DBClient` called `dbClient`.


[2. First API](./controllers/AppController.js)

Inside `server.js`, create the Express server:

* it should listen on the port set by the environment variable `PORT` or by default 5000
* it should load all routes from the file `routes/index.js`
Inside the folder `routes`, create a file `index.js` that contains all endpoints of our API:

	* `GET /status` => `AppController.getStatus`
	* `GET /stats` => `AppController.getStats`
Inside the folder `controllers`, create a file `AppController.js` that contains the definition of the 2 endpoints:

Create tests for each endpoints:

* `GET /status`
* `GET /stats`
* `POST /users`
* `POST /login`
* `POST /logout`
* `GET /users/me`

## Swagger documentation
run `$ npm run swagger`  to update the documentation
