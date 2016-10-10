const attach = require('./attach');
const ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';

module.exports = attach(ENVIRONMENT_IS_WORKER ? self : window);
