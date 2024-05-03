const jwt = require('jsonwebtoken');
const KEY = process.env.SECRET_KEY

function verifyToken(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    console.log(req.headers.authorization)
    if (!token) {
        return res.status(401).json({ error: 'Authorization token is missing' });
    }

    jwt.verify(token, KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.user = decoded;
        return next();
    });

    // // req.user = {
    // //     "_id": "662f84f72f84ed622d8aaf3d",
    // //     "email": "jane.smith@example.com",
    // //     "role": "seller",
    // //     "name": "Jane Smith",
    // //     "iat": 1710850443
    // // };
    // next();
}

function isSeller(req, res, next) {
    if (req.user && req.user.role === 'seller' || req.user.role === 'admin' ) {
        next();
    } else {
        res.status(403).json({ error: 'Unauthorized access, Only Seller Can Perform this Action', data: req.user });
    }
}

function isAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Unauthorized access, Only Admins Can Perform this Action', data: req.user });
    }
}

module.exports = { verifyToken, isSeller, isAdmin };
