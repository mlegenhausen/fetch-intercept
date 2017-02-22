/*
* Configuration for React-Native's package system
* @providesModule whatwg-fetch
*/


// Uses Emscripten stategy for determining environment
const ENVIRONMENT_IS_REACT_NATIVE = typeof navigator === 'object' && navigator.product === 'ReactNative';
const ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof require === 'function';
const ENVIRONMENT_IS_WEB = typeof window === 'object';
const ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';

if (ENVIRONMENT_IS_REACT_NATIVE || ENVIRONMENT_IS_NODE) {
  attach(global);
} else if (ENVIRONMENT_IS_WORKER) {
  attach(self);
} else if (ENVIRONMENT_IS_WEB) {
  attach(window);
} else {
  throw new Error('Unsupported environment for fetch-intercept');
}

function attach(env) {
  // Make sure fetch is avaibale in the given environment
  if (!env.fetch) {
    try {
      require('whatwg-fetch');
    } catch (err) {
      throw Error('No fetch avaibale. Unable to register fetch-intercept');
    }
  }
  env.fetch = (function (fetch) {
    return function (...args) {
      return interceptor(fetch, ...args);
    };
  })(env.fetch);
}

let interceptors = [];

function interceptor(fetch, ...args) {
  const reversedInterceptors = interceptors.reduce((array, interceptor) => [interceptor].concat(array), []);
  let promise = Promise.resolve(args);

  // Register request interceptors
  reversedInterceptors.forEach(({ request, requestError }) => {
    if (request || requestError) {
      promise = promise.then(args => request(...args), requestError);
    }
  });

  // Register fetch call
  promise = promise.then(args => fetch(...args));

  // Register response interceptors
  reversedInterceptors.forEach(({ response, responseError }) => {
    if (response || responseError) {
      promise = promise.then(response, responseError);
    }
  });

  return promise;
}

module.exports = {
  register: function (interceptor) {
    interceptors.push(interceptor);
    return () => {
      const index = interceptors.indexOf(interceptor);
      if (index >= 0) {
        interceptors.splice(index, 1);
      }
    };
  },
  clear: function () {
    interceptors = [];
  }
};
