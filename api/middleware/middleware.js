// set up token middleware here
import jwt from "jsonwebtoken";
import 'dotenv/config';

const SECRET_KEY = process.env.SECRET_KEY;

function authenticate(req, res, next) {
    const token = req.headers.authorization;
    console.log("TOKEN", token);
  
    if (!token) {
        return res.status(401).json({
            message: 'Authentication failed: No token provided'
        });
    }

    const tokenWithoutBearer = token.split(' ')[1];

    jwt.verify(tokenWithoutBearer, SECRET_KEY, (error, decoded) => {
        if (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({
                    message: 'Authentication failed: Token expired'
                });
            } else if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({
                    message: 'Authentication failed: Invalid token'
                });
            } else {
                return res.status(401).json({
                    message: 'Authentication failed: Token validation error'
                });
            }
        }

        req.decoded = decoded;
        next();
    });
}

export default authenticate;