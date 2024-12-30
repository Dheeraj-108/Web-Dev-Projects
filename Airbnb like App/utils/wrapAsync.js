function wrapAsync(asyncFunc) {
    return function(req, res, next) {
        asyncFunc(req, res, next).catch((err) => next(err));
    }
}

module.exports = wrapAsync;