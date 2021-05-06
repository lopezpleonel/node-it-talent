require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        req.userData = jwt.verify(token, process.env.SECRET);
        
    } catch (error) {
        return res.status(401).json({
            message : "Autorization failed"
        })
    }
    next();
};