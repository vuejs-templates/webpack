# Build Environments

You often need to have different config values according to the environment that the application is running in. Typical use cases are to log warnings to console while running in `development`, but not in `production`, or using different URLs or access keys for the API endpoint in different environments.

This templates offers two ways to integrate environment variables

1. Environment-specific env.js files (for things like API URLs or debug log levels)
2. An `.env` file (for sensitive information like keys and passwords)


## Environment-specific `*.env.js` files

These files are meant for nno-sensitive values which we want to pass to our Vue application. Examples would be the API-URL we use for tests against our test backend

> Don't add sensitive values like passwords to these files, see the section about the `.env` file further below.

You can tell the template with environment to use with `APP_ENV` variable when running a command:

```
APP_ENV=development npm run dev
APP_ENV=production npm run build
APP_ENV=test npm run test
```

Since those are the most usual combinations, they are set by default for you, so these two do the same:

```
APP_ENV=development npm run dev
// and:
npm run dev
```

However you can, for example, build a bundle that uses `development` variables like this:

```
APP_ENV=development npm run build
```

These files are located in `/config/environments` and look like this:

```js
// config/environments/development.env.js
module.exports = {
  NODE_ENV: '"development"',
  DEBUG_MODE: true 
}
```

### Usage		

It is simple to use the environment variables in your code. For example:		

```javascript
Vue.config.productionTip = process.env.NODE_ENV === 'production'		
```

> **Note:** string variables need to be wrapped into single and double quotes `'"..."'` or stringified with `JSON.stringify()`

###  Additional Environments

Creating a file for an aditional environment is pretty straightforward. You simply create a new file in `/config/environments`, e.g. `staging.env.js`:
```javascript
module.exports = {
  NODE_ENV: "'production'", // this should behave like a production app
  API_URL: '"http://staging.yourapp.com/api/v1"' // but use this URL for API calls.
}
```
Then you set a special environment variable: `APP_ENV` to select it when using one of the commands:

```
// Build the app in production mode, but with staging variables
APP_ENV=staging npm run build
```

Note that `process.env.NODE_ENV` will still be `production` in the node process building the files, but we now pass the environment vriables of `staging.env.js` to webpack, instead of those of production.env.js

## .env file

The `.env` file lives in the root folder of your project and has a special job: it keeps sensitive information a secret.

Sensitive Information like API keys should never be stored in version control. A common approach to handle information such as this is a `.env` file. Such a file has to be stored in the root folder of your project and might look like this:
```
API_KEY=sdhdjskssdksnsklslsjsmslwp39383
DB_USER=root
DB_PASS=abc123
```

### Why is the `.env` file more secure?

The `.env` file is listed in `.gitignore` and will therefore never be checked into git. That means that you can define a file in every environment that you deploy your application to, and don't risk mixing up keys between different environments or exposing secrets on github.

You can read more about this pattern here: https://12factor.net/config

### How it works

We use [dotenv](https://www.npmjs.com/package/dotenv) to load this file as soon as you run one of the available [commands](commands.md). Dotenv sets a property on `process.env` for each line in that file.

So the File from above would allow you to access the following environment keys within the node process:

```
process.env.API_KEY // => sdhdjskssdksnsklslsjsmslwp39383
process.env.DB_USER // => root
process.env.DB_PASS // => abc123
```

### Using these variables inside of your Vue app

`dotenv` makes those values available to the node-process that is currently running - like `webpack-dev-server` or `karma`. But they are not accessible from within your Vue application, and for good reason: a Vue app runs in the browser, so all information we access in the app can be accessed by anone using our app. So you should consider carefully which of these values you want to expose to the client.

The `/config./environments_external.env.js` file provides a place for you to define the environment variables that you want to pass on to webpack.

```javascript
// /config/environments/_external.js
module.exports = {
  API_KEY: JSON.stringify(process.env.API_KEY)
}
```

> **Note:** string variables need to be wrapped into single and double quotes `'"..."'`, or be stringified with `JSON.stringify()`

Now you can access those same values right in your Vue app like in the node environment we described for the Environment-specific `*.env.js` files further up.
