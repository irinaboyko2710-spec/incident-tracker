const errorHandler = (err, req, res, next) => {
    console.error("Centralized Error Logged:", err.message);
    res.status(500).json({
        status: 500,
        title: "Internal Server Error",
        detail: "An unexpected error occurred on the server.",
        instance: req.originalUrl
    });
};
module.exports = errorHandler;