
### Installation

agileEngineTestServer requires:
* [Node.js](https://nodejs.org/) v8+;

Install the dependencies and devDependencies and start the server.
To install all dependencies properly, `package-lock.json` file is required.

```
$ cd agileEngineTestServer
$ npm ci
```


### Configuration
Copy `config/default.json` to your custom `config/${environment-name}.json` file to extend default configuration. `${environment-name}` is string value which is taken from `NODE_ENV` environment variable. All environment variables which are the same from env to env should be stored in `default.json`. All environment-specific configuration variables should be stored in `config/env-name.json` files.

```
### Deploying
```
1. Apply migrations
```
$export NODE_ENV=${YOUR_ENV_NAME} && npm run migrate
```
1. set environment and run server

```
$ export NODE_ENV=${YOUR_ENV_NAME} &&npm start
```
or
```
$ node ./dist/app.js
```


