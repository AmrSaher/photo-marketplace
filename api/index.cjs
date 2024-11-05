// index.cjs

const path = require("path");

(async () => {
    try {
        const appPath = path.resolve(__dirname, "../app.mjs");
        const { default: app } = await import(appPath);

        // Here you can start your server or use the `app` instance
        // For example, to start the server (if applicable):
        // const PORT = process.env.PORT || 3000;
        // app.listen(PORT, () => {
        //     console.log(`Server is running on http://localhost:${PORT}`);
        // });

        module.exports = app; // Export the app instance for use
    } catch (error) {
        console.error("Failed to import app:", error);
        process.exit(1); // Exit the process with a failure status
    }
})();
