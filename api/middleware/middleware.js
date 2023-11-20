// set up token middleware here
import jwt from "jsonwebtoken";
import 'dotenv/config';

const SECRET_KEY = process.env.SECRET_KEY;

export function authenticate(req, res, success) {
    const token = req.headers.authorization;
    console.log("TOKEN", token);
  
    if (!token) {
        return res.status(401).json({
            message: 'Authentication failed: No token provided'
        });
    }

    const tokenWithoutBearer = token.split(' ')[1];

    jwt.verify(tokenWithoutBearer, SECRET_KEY, (error, owner) => {
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

        req.owner = owner;
        success();
    });
}



export function userVerify(req, res, success) {
    const token = req.headers.authorization;
    console.log("TOKEN", token);
  
    if (!token) {
        return res.status(401).json({
            message: 'Authentication failed: No token provided'
        });
    }

    const tokenWithoutBearer = token.split(' ')[1];

    jwt.verify(tokenWithoutBearer, SECRET_KEY, (error, user) => {
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

        req.user = user;
        success();
    });
}