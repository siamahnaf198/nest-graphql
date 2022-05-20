import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthGaurd implements CanActivate {

    async canActivate(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context).getContext();
        if (!ctx.headers.authorization) {
            return false;
        }
        ctx.user = await this.validateToken(ctx.headers.authorization);
        console.log(ctx.user.info);
        return true;
    }

    validateToken(auth: string) {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        const token = auth.split(' ')[1];
        try {
            return jwt.verify(token, process.env.JWT_SECRET_KEY)
        } catch (err) {
            throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED)
        }
    }
}