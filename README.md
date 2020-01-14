# EnergyAustralia

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

## Initial set-up 
  1. run `nvm use`
  2. run `npm install`

## Setting up and running the app locally

After running `npm install`

run `npm run start`

This will start start a dev server to serve the application and a proxy will forward them to the correct server. For details on the proxy see _proxy.config.json
Navigate to `http://localhost:4100/` To view the application. The app will automatically reload if you change any of the source files.

**Note:** `ng serve` will start the server but will not run a full build with lint checks but `npm run start` does this for you. 

## Running unit tests
Code coverage is set to 100% coverage. I have set up the project to have a git hook to do code coverage check prior pushing changes to branch 

1. `npm test`

   This will run all unit tests in a single run and produce a coverage report. This is the command used in bamboo jobs

1. `ng test` 

   This will run all unit tests and watch for changes. See [ng test wiki page](https://github.com/angular/angular-cli/wiki/test) for more info

Coverage and Unit test reports sit in _reports/test/_

## Running end-to-end tests

`ng e2e` 

This will execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `npm start`.


### Build

`ng build` 

To build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
