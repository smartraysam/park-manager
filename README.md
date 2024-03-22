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
* Process API doc
* Express getting started
* Mocha documentation
* Nodemon documentation
* MongoDB
* Bull
* Image thumbnail
* Mime-Types
* Redis

## Requirements
* Allowed editors: `vi`, `vim`, `emacs`, `Visual Studio Code`
* All your files will be interpreted/compiled on Ubuntu `18.04 LTS` using `node` (version `12.x.x`)
* All your files should end with a new line
* A `README.md` file, at the root of the folder of the project, is mandatory
* Your code should use the `js` extension
* Your code will be verified against lint using `ESLint`

## Provided files
### `package.json`
<details>

<summary>Click to show/hide file contents</summary>

```
{
  "name": "files_manager",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "lint": "./node_modules/.bin/eslint",
    "check-lint": "lint [0-9]*.js",
    "start-server": "nodemon --exec babel-node --presets @babel/preset-env ./server.js",
    "start-worker": "nodemon --exec babel-node --presets @babel/preset-env ./worker.js",
    "dev": "nodemon --exec babel-node --presets @babel/preset-env",
    "test": "./node_modules/.bin/mocha --require @babel/register --exit" 
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bull": "^3.16.0",
    "chai-http": "^4.3.0",
    "express": "^4.17.1",
    "image-thumbnail": "^1.0.10",
    "mime-types": "^2.1.27",
    "mongodb": "^3.5.9",
    "redis": "^2.8.0",
    "sha1": "^1.1.1",
    "uuid": "^8.2.0"
  },
  "devDependencies": {
    "@babel/cli": "^7.8.0",
    "@babel/core": "^7.8.0",
    "@babel/node": "^7.8.0",
    "@babel/preset-env": "^7.8.2",
    "@babel/register": "^7.8.0",
    "chai": "^4.2.0",
    "chai-http": "^4.3.0",
    "mocha": "^6.2.2",
    "nodemon": "^2.0.2",
    "eslint": "^6.4.0",
    "eslint-config-airbnb-base": "^14.0.0",
    "eslint-plugin-import": "^2.18.2",
    "eslint-plugin-jest": "^22.17.0",
    "request": "^2.88.0",
    "sinon": "^7.5.0"
  }
}
```

</details>

### `.eslintrc.js`
<details>

<summary>Click to show/hide file contents</summary>

```
module.exports = {
    env: {
      browser: false,
      es6: true,
      jest: true,
    },
    extends: [
      'airbnb-base',
      'plugin:jest/all',
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    plugins: ['jest'],
    rules: {
      'max-classes-per-file': 'off',
      'no-underscore-dangle': 'off',
      'no-console': 'off',
      'no-shadow': 'off',
      'no-restricted-syntax': [
        'error',
        'LabeledStatement',
        'WithStatement',
      ],
    },
    overrides:[
      {
        files: ['*.js'],
        excludedFiles: 'babel.config.js',
      }
    ]
};
```

</details>

### `babel.config.js`
<details>

<summary>Click to show/hide file contents</summary>

```
module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
    ],
};
```

</details>

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
```
bob@dylan:~$ cat main.js
import redisClient from './utils/redis';

(async () => {
    console.log(redisClient.isAlive());
    console.log(await redisClient.get('myKey'));
    await redisClient.set('myKey', 12, 5);
    console.log(await redisClient.get('myKey'));

    setTimeout(async () => {
        console.log(await redisClient.get('myKey'));
    }, 1000*10)
})();

bob@dylan:~$ npm run dev main.js
true
null
12
null
bob@dylan:~$
```

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
```
bob@dylan:~$ cat main.js
import dbClient from './utils/db';

const waitConnection = () => {
    return new Promise((resolve, reject) => {
        let i = 0;
        const repeatFct = async () => {
            await setTimeout(() => {
                i += 1;
                if (i >= 10) {
                    reject()
                }
                else if(!dbClient.isAlive()) {
                    repeatFct()
                }
                else {
                    resolve()
                }
            }, 1000);
        };
        repeatFct();
    })
};

(async () => {
    console.log(dbClient.isAlive());
    await waitConnection();
    console.log(dbClient.isAlive());
    console.log(await dbClient.nbUsers());
    console.log(await dbClient.nbFiles());
})();

bob@dylan:~$ npm run dev main.js
false
true
4
30
bob@dylan:~$ 
```

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
* `GET /connect`
* `GET /disconnect`
* `GET /users/me`
* `POST /files`
* `GET /files/:id`
* `GET /files` (don’t forget the pagination)
* `PUT /files/:id/publish`
* `PUT /files/:id/unpublish`
* `GET /files/:id/data`
