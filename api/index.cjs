// index.cjs

// Import the app from app.mjs using dynamic import
const path = require('path');

(async () => {
    const { default: app } = await import(path.resolve(__dirname, '../app.mjs'));

    // Export the app as the default export
    module.exports = app;
})();
