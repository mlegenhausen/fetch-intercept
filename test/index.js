const expect = require('expect');

const fetchInterceptor = require('../src/browser');

describe('fetch-intercept', function () {
  beforeEach(() => fetchInterceptor.clear());

  it('should intercept fetch calls', function (done) {
    let requestIntercepted = false;
    let responseIntercepted = false;

    fetchInterceptor.register({
      request: function (...args) {
        requestIntercepted = true;
        return args;
      },
      response: function (response) {
        responseIntercepted = true;
        return response;
      }
    });

    fetch('http://google.de', {
      mode: 'no-cors'
    })
    .then(function () {
      expect(requestIntercepted).toBe(true);
      expect(responseIntercepted).toBe(true);
      done();
    });
  });

  it('should intercept response errors', function (done) {
    let responseIntercepted = false;

    fetchInterceptor.register({
      responseError: function (error) {
        responseIntercepted = true;
        return Promise.reject(error);
      }
    });

    fetch('http://404', {
      mode: 'no-cors'
    })
    .catch(function () {
      expect(responseIntercepted).toBe(true);
      done();
    });
  });

  it('should intercept request interception errors', function (done) {
    let requestIntercepted = false;

    fetchInterceptor.register({
      requestError: function (error) {
        requestIntercepted = true;
        return Promise.reject(error);
      }
    });

    fetchInterceptor.register({
      request: function () {
        throw new Error('Error');
      }
    });

    fetch('http://google.com', {
      mode: 'no-cors'
    })
    .catch(function () {
      expect(requestIntercepted).toBe(true);
      done();
    });
  });

  it('should unregister a registered interceptor', function (done) {
    let requestIntercepted = false;

    const unregister = fetchInterceptor.register({
      request: function (...args) {
        requestIntercepted = true;
        return args;
      }
    });

    unregister();

    fetch('http://google.de', {
      mode: 'no-cors'
    })
    .then(function () {
      expect(requestIntercepted).toBe(false);
      done();
    });
  });
});
