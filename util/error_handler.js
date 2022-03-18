module.exports = (error, next) => {
    if (!error.statusCode) {
        error.statusCode = 500
    }
    return next(error)
}