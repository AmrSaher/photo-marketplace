(async () => {
    try {
        const { default: app } = await import("../app.mjs");
        module.exports = app;
    } catch (error) {
        console.error("Failed to import app:", error);
        process.exit(1);
    }
})();
