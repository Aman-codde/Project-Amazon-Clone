import {Request, Response, NextFunction, RequestHandler} from "express";
import jwt from 'jsonwebtoken';
import { User } from "../../shared/models/user.model.js";

interface AuthRequest extends Request {
    user?: User
}
 
function authHandle(req: AuthRequest, res: Response, next: NextFunction) {
    const cookie = req.cookies['jwt'];
    console.log('auth ',cookie);
    
    jwt.verify(
        cookie, 
        process.env.ACCESS_TOKEN_SECRET as string, 
        (err: any, result: any) => {
        console.log('Auth result = ', result)
        if(result) {
            req.user = result.user;
        }
        if(err){
            res.sendStatus(403)
        }
    })
    next();
}

export const authHandler = authHandle 