const errorHandler = (err, req, res, next) => {
    console.log(err, `<< DARI ERROR HANDLER`);
    let status = err.status || 500
    let message = err.message || 'Internal Server Error'

    if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        status = 400
        message = err.errors[0].message
    }

    res.status(status).json({ message })
}


module.exports = errorHandler