const jwt = require('jsonwebtoken');

const generateJwt = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn:4000});
}

const verifyJwt = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if(!token) {
        res.status(401).json({error: "unauthorized"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({error: 'Invalid Token'});
    }
};

module.exports = {
    generateJwt,
    verifyJwt
}