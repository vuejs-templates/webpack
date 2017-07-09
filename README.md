# vue-django-webpack-boilerplate


> A full-featured Webpack setup with hot-reload, lint-on-save, unit testing & css extraction integrated into a django application

[![Code Climate](https://codeclimate.com/github/NdagiStanley/vue-django/badges/gpa.svg)](https://codeclimate.com/github/NdagiStanley/vue-django)
<a href="https://codeclimate.com/github/NdagiStanley/vue-django"><img src="https://codeclimate.com/github/NdagiStanley/vue-django/badges/issue_count.svg" /></a>

[![Updates](https://pyup.io/repos/github/NdagiStanley/vue-django/shield.svg)](https://pyup.io/repos/github/NdagiStanley/vue-django/)
[![Python 3](https://pyup.io/repos/github/NdagiStanley/vue-django/python-3-shield.svg)](https://pyup.io/repos/github/NdagiStanley/vue-django/)


## Version Notice

If you are using `vue-cli@1.x`, it will be pulling the `master` branch of this template by default. If you are using `vue-cli@2.x`, it will be pulling the `dist` branch instead, which provides more configurable options thanks to new features in `vue-cli@2.x`. It is recommended to upgrade `vue-cli` as soon as you can.

## Documentation

Common topics are discussed in the [docs](http://vuejs-templates.github.io/webpack). Make sure to read it!

## Usage

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli). **It is recommended to use npm 3+ for a more efficient dependency tree.**

``` bash
$ npm install -g vue-cli
```
You might want to use ```sudo``` if you encounter permissions error
```bash
$ vue init NdagiStanley/vue-django my-project
$ cd my-project
$ npm install
```

Secondly, have *Python* installed and preferably create a virtual environment for the project.

To develop

```bash
$ npm run dev
```

## Deploy
To deploy your django project

`$ .deploy.sh`

Then get to [localhost:8000](http://localhost:8000/). You should have a page exactly like the image below.
![](http://i.imgur.com/sY3IpBE.png?1)

> Docker

You can run a docker container for it simply by running the following command. Ensure that **docker** is running.
```bash
docker run -p 8000:8000 stanmd/vue-django python manage.py runserver 0.0.0.0:8000
```

Then get to [localhost:8000](http://localhost:8000/). You should have a page exactly like the image above

## What's Included

- `npm run dev`: first-in-class development experience.
  - Webpack + `vue-loader` for single file Vue components.
  - State preserving hot-reload
  - State preserving compilation error overlay
  - Lint-on-save with ESLint
  - Source maps

- `npm run build`: Production ready build.
  - JavaScript minified with [UglifyJS](https://github.com/mishoo/UglifyJS2).
  - HTML minified with [html-minifier](https://github.com/kangax/html-minifier).
  - CSS across all components extracted into a single file and minified with [cssnano](https://github.com/ben-eb/cssnano).
  - All static assets compiled with version hashes for efficient long-term caching, and a production `index.html` is auto-generated with proper URLs to these generated assets.

- `npm run unit`: Unit tests run in PhantomJS with [Karma](http://karma-runner.github.io/0.13/index.html) + [Mocha](http://mochajs.org/) + [karma-webpack](https://github.com/webpack/karma-webpack).
  - Supports ES2015 in test files.
  - Supports all webpack loaders.
  - Easy mock injection.

- `npm run e2e`: End-to-end tests with [Nightwatch](http://nightwatchjs.org/).
  - Run tests in multiple browsers in parallel.
  - Works with one command out of the box:
    - Selenium and chromedriver dependencies automatically handled.
    - Automatically spawns the Selenium server.

### Contributions

**NB**: This repo has been forked from vue-webpack-boilerplate to build help you start a Django application utilizing the awesomeness of `Vue JS` and `vue-cli`

Feel free to contribute to this repo.

To create your own boilerplate, fork this repo or [vue-webpack-boilerplate](https://github.com/vuejs-templates/webpack) and use it with `vue-cli`:

``` bash
vue init username/repo my-project
```
