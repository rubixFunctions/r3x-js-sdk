# RubiX JavaScript SDK

[![CircleCI](https://circleci.com/gh/rubixFunctions/r3x-js-sdk.svg?style=svg&circle-token=ea49ae7fcdad52c04d1d567200ad09abf15a2044)](https://circleci.com/gh/rubixFunctions/r3x-js-sdk)
[![License](https://img.shields.io/badge/-Apache%202.0-blue.svg)](https://opensource.org/s/Apache-2.0)

## Getting Started
These steps will get you a clone of the repository, install the dependancies and run the SDK.

```
$ git clone git@github.com:rubixFunctions/r3x-js-sdk.git
$ npm install
$ npm start
```

## Running Function
For development and testing purposes, the function is available and can be run as a container.
```
$ docker pull quay.io/ciaranroche/r3x-js-hello-world
$ docker run -t -p 8080:8080 quay.io/ciaranroche/r3x-js-hello-world
```
Once running POST request to `localhost:8080`

## License
This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details