const { ACCESS_KEY, SECRET_KEY } = process.env;

const onShapeAuth = (req, res, next) => {
    req.onShapeToken = `Basic ${Buffer.from(`${ACCESS_KEY}:${SECRET_KEY}`).toString('base64')}`
    next()
};

module.exports = onShapeAuth