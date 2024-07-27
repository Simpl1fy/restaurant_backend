const jwt = require('jsonwebtoken');


// function to verify jwt token
const jwtAuthMiddleware = (req, res, next) => {
    
    // extract the json token from the header
    const token = req.header.authorization.split(' ')[1];
    if (!token ) return res.status(401).json({"Error": "Token not found"});

    // now verifying the token
    try {
        // verifying the user token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // saving the new token in the request
        req.jwtPayload = decoded;
        next();

    } catch (err) {
        console.error(err);
        res.status(401).json({"error": "authorization denied"})
    }

}

// function to generate token

const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET);
}



module.exports = {jwtAuthMiddleware, generateToken};