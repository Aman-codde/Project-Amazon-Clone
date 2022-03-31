import "express";
import jwt from 'jsonwebtoken';
import "../../shared/models/user.model.js";
function authHandle(req, res, next) {
    const cookie = req.cookies['jwt'];
    console.log('auth ', cookie);
    jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
        console.log('Auth result = ', result);
        if (result) {
            req.user = result.user;
        }
        if (err) {
            res.sendStatus(403);
        }
    });
    next();
}
export function isLoggedInHandle(req, res, next) {
    const cookie = req.cookies['jwt'];
    console.log('auth ', cookie);
    jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
        console.log('Auth result = ', result);
        if (result) {
            req.user = result.user;
        }
    });
    next();
}
export const authHandler = authHandle;
//# sourceMappingURL=auth.middleware.js.map