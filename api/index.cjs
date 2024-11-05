// index.cjs

// Use dynamic import to load the ES module
const path = require("path");

(async () => {
    try {
        const { default: app } = await import(
            path.resolve(__dirname, "../app.mjs")
        );

        // Export the app
        module.exports = app;
    } catch (error) {
        console.error("Failed to import app:", error);
        process.exit(1); // Exit the process with a failure status
    }
})();
