const jwt = require("jsonwebtoken");
const JWTsecretKey = process.env.SECRET_KEY;
module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }
    jwt.verify(token, JWTsecretKey, (err, decoded) => {
        if (err) {
            console.log("token error:", err);
            return res.status(403).json({ message: 'Failed to authenticate token.' });
        }
        console.log("token Authenticated");
        req.user = decoded;
        console.log(decoded);
        next();
    });
};
