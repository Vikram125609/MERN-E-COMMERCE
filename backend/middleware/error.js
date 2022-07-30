const ErrorHander = require("../utils/errorhander");

const errorHandling = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;
    // Wrong MongoDB Id Error
    if(err.name === 'CastError')
    {
        const message = `Resoucre not found. Invalid : ${err.path}`;
        err = new ErrorHander(message,400);
    }
    res.status(err.statusCode).json({ success: false, message: err.message  });
}
module.exports = errorHandling;