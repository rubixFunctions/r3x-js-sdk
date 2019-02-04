# RubiX JavaScript SDK

[![CircleCI](https://circleci.com/gh/rubixFunctions/r3x-js-sdk.svg?style=svg&circle-token=ea49ae7fcdad52c04d1d567200ad09abf15a2044)](https://circleci.com/gh/rubixFunctions/r3x-js-sdk)
[![npm version](http://img.shields.io/npm/v/REPO.svg?style=flat)](https://www.npmjs.com/package/@rubixfunctions/r3x-js-sdk "View this project on npm")
[![License](https://img.shields.io/badge/-Apache%202.0-blue.svg)](https://opensource.org/s/Apache-2.0)

## Getting Started
These steps will get you a clone of the repository, install the dependancies and run the SDK.

```
$ git clone git@github.com:rubixFunctions/r3x-js-sdk.git
$ npm install
$ npm start
```

## Running Function
For development and testing purposes, a function is available and can be run as a container.
```
$ docker pull quay.io/rubixfunctions/r3x-js-showcase
$ docker run -t -p 8080:8080 quay.io/rubixfunctions/r3x-js-showcase
```
Once running POST request to `localhost:8080`

## Documentation
For full information on how to use the SDK and deploy a function to Knative, refer to our [Documentation here.](https://github.com/rubixFunctions/r3x-docs/blob/master/install/README.md)

## License
This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details