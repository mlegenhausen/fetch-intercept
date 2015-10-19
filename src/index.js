import once from 'lodash.once';
import wrap from 'lodash.wrap';
import pull from 'lodash.pull';

let interceptors = [];

window.fetch = wrap(window.fetch, function (fetch, ...args) {
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
});

export default {
  register: function (interceptor) {
    interceptors.push(interceptor);
    return once(() => pull(interceptors, interceptor));
  },
  clear: function () {
    interceptors = [];
  }
};
