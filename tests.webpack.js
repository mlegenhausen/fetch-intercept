/* make sure you have your directory and regex test set correctly! */
const context = require.context('./test', true, /\.js$/);
context.keys().forEach(context);
