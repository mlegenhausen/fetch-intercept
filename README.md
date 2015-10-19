# fetch-intercept

Interceptor library for the native fetch command inspired by [angular http interceptors](https://docs.angularjs.org/api/ng/service/$http).

_Note_: Current only browser environments are supported.

## Installation

```
npm install fetch-intercept --save
```

## Usage

Make sure you have a `fetch` [compatible browser](http://caniuse.com/#search=fetch) or added a [appropriate polyfill](https://github.com/github/fetch).

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

## License
MIT