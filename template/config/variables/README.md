## What these files are for

You application can run in different modes - development, test, production.

Each of these modes might require different default values for things like:

* log levels
* API URLs
* API access keys
* ...?

You can define these values in the files with the name matching the mode.
```javascript
// config/variables/development.js
module.exports = {
  API_URL: 'dev.localhost:3000'
}
// config/variables/prod.env.js
module.exports = {
  API_URL: 'production.yourapp.com/api/v1'
}
```

> If you are pulling your hair at this point because we are saving config in the code, please read on. We talk about those concerns in depth a bit further down.

We can also map to environment variables easily.

```javascript
// config/variables/development.js
module.exports = {
  API_URL: process.env.API_URL
}
```

You will also find a file called `externals.js` in this folder. Use this file if to map any environment variables that you want to pass to your Vue app independent of the mode.

### How are these files processed?

When you run one of the available [commands](commands.md), `process.env.NODE_ENV` will be set to one of the three modes mentioned above, and the appropriate module from `/config/variables` will be required. The object exported by that module will be merged with the one from `externals.js`. In case of duplicate entries, the latter overwrites the former.

The resulting object will be passed to webpack's [`DefinePlugin`](https://webpack.js.org/plugins/define-plugin/) to make the values available in your Vue application.

### How do I use these values in my application?

You can access each of these values as properties of `process.env` inside your app.

Example:
```javascript
axios.get(process.env.API_URL + '/users').then(/*...*/)
```

## `.env` file support

Whenever you run one of the available [commands](commands.md) (expect `lint`), We use [dontenv](https://www.npmjs.com/package/dotenv) to load any environment variables that you have provided with an `.env` file in the root directory of your project.

That means that you can pass values from your `.env` file to your Vue app through the variable files we introduced above.

Example:
```
# /.env
API_KEY: hd833nfn029373bek$02
```
```javascript
// config/variables/_externals.env.js
module.exports = {
  API_KEY: process.env.API_KEY
}
```
```javascript
// inside your Vue app:
axios.get(process.env.API_URL + '/users?key=' + process.env.API_KEY).then(/*...*/)
```

## Strategies for different build environments.

Usually you have more build environments than the three app modes - `development`, `test`, `production`. You have a CI environment where you run tests, a staging environment where you run tests and run a built version of your app for your team to test, a QA environment that holds a "copy" of your prod for debugging purposes and so on. In some of those environments you only run `nrpm run test`, in only `npm run build` and in some you run both, or even `npm run dev`. The bottom line is, each app's setup is different, each team's requirements are different.

How can you condfigure those different environments and still keep configuration flexible and secure?

The answer is environment variables configured in an `.env` file, namespaced by "mode".

Here's you this would look for a "staging" environment:
```
// /.env
API_KEY_DEV=dusgnsdk374849$$33h
API_KEY_TEST=hd833nfn029373bek$02
API_KEY_PROD=hd833nfn029373bek$02
```
```javascript
// /config/variables/test.js
module.exports = {
  API_KEY: process.env.API_KEY_TEST
}
// /config/variables/production.js
module.exports = {
  API_KEY: process.env.API_KEY_PROD
}
```

Now when you run `npm run test`, inside of your Vue app, `process.env.API_KEY` will match the value of `API_KEY_TEST` in your `.env` file,

When you run `npm run build`, it will match `API_KEY_PROD`. In this case it's the same value, because you want to run the `build` command with the same API_KEY as the `test` command, but they can be differnt in other environments, like when you develop locally:

```
// /.env
API_URL_DEV=localhost:8080 // dev-server
API_URL_TEST=localhost:4001 // test-backend
```
```javascript
// /config/variables/development.js
module.exports = {
  API_KEY: process.env.API_URL_DEV
}
// /config/variables/test.js
module.exports = {
  API_KEY: process.env.API_URL_TEST
}
```

## A word on 'seperation of config from code' according to "The 12 Factor App"

The 12 Factor App has a [section](https://12factor.net/config) about configuration values that recommends to extract *all* such values into environment variables, and never save them inside code - like we allow you do in the files mentioned above. 

The main concerns are:

1. storing sensitive information like API keys in code that's pushed to git can be insecure. Secrets may become public (i.e. over github), or they may leak between environments (i.e. a test environment accidentally using `production` credentials)
2. Using config files for each build environment is inflexible. You will inevitably end up with a requirement for another environment that needs different config values than `test` or `production`, or `staging` and so on.

We think this is mostly good advice, but in the context of this template, some things are to be considered to get some perspective:

### Sensitive Information

Every value that you pass into your app and use it can be accessed by your users one way or another. For that reason, frontend apps (the kind this template is meant for) should generally do not contain sensitive information like API secrets or database keys. If however you do need those values in your build setup, for example, it is absolutely good practice to pass those in via environment variables - jand don't pass them on to your Vue app through the variable files we discussed above.

### Config files per environment are inflexible

We agree to that as well. But `development`, `test` and `production` are not so much build environments as they are different *modes* that the application can run in. 

Since there are many situations where you want to run more than one of those modes in the same environment, but with different values for a given variable (i.e. running `dev` and `test` locally, as further up), these different values have to be passed in with different environment variables. But these different variables have to be re-mapped to the same name if they ought to be accessible within the application:

While you might have these environment variables:
```
API_URL_DEV=dev.localhost:3000
API_URL_TEST=dev.localhost:3000
```

Your app only knows about `process.env.API_URL`, so we have to map the value of these environment variables to `API_URL` depending on the mode we are running in. That's what the files in `/config/variables` are for.