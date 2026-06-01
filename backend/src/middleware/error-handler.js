module.exports = (err, req, res, next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        error: {
            code: err.code || "INTERNAL_SERVER_ERROR",
            message: err.message || "Щось пішло не так на сервері",
            details: err.details || []
        }
    });
};