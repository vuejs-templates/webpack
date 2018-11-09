## What is this folder?

This folder contains test scenarios for the automated tests of the template on CircleCI.

Each `.json`file contains an object that represents a set of answers to the questions that vue-cli asks the user when installing the template.

With the code from `index.js`, we insert those answers into the metalsmith metadata and skip the inquirer questions, thus allowing us to run different test scenarios in CI without having to actually provide any answers to inquirer or to mock it.

## The scenarios

We currently have 3 scenarios set up:

1. 'minimal': it basically answers "no" to ever choice, so no router, no eslint, no tests
2. 'full': It answers "yes" to every choice. With router, with linting (standard), with full tests (jest & e2e)
3. 'full-airbnb-karma': like 'full', but using airbnb eslint config instead of standard and karma instead of jest for unit tests.

Other permutations might be worth testing to secure against edge cases, but this gives us a decent level of security over common combinations.

## How to use it?

Choosing a scenario is done through setting an ENV variable named `VUE_TEMPL_TEST`.

You can run a scenario yourself by running this in your terminal:

````
VUE_TEMPL_TEST=minimal vue init webpack your-directory
```
