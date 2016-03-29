# fetch-intercept

[![Build Status](https://travis-ci.org/werk85/fetch-intercept.svg?branch=master)](https://travis-ci.org/werk85/fetch-intercept)

Interceptor library for the native fetch command inspired by [angular http interceptors](https://docs.angularjs.org/api/ng/service/$http).

`fetch-intercept` monkey patches the global `fetch` method and allows you the usage in Browser, Node and Webworker environments.

## Installation

```
npm install fetch-intercept --save
```

## Usage

_Note_: You need to require `fetch-intercept` before you use `fetch` the first time.

Make sure you have a `fetch` [compatible environment](http://caniuse.com/#search=fetch) or added a [appropriate polyfill](https://github.com/github/fetch).

```js
import fetchIntercept from 'fetch-intercept';

const unregister = fetchIntercept.register({
    request: function (url, config) {
        // Modify the url or config here
        return [url, config];
    },

    requestError: function (error) {
        // Called when an error occured during another 'request' interceptor call
        return Promise.reject(error);
    },

    response: function (response) {
        // Modify the reponse object
        return response;
    },

    responseError: function (error) {
        // Handle an fetch error
        return Promise.reject(error);
    }
});

// Call fetch to see your interceptors in action.
fetch('http://google.com');

// Unregister your interceptor
unregister();
```

## React-Native Compatibility
Support react-native `0.17` or higher versions.

## License
MIT