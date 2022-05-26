import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GqlExecutionContext } from "@nestjs/graphql";
import * as jwt from "jsonwebtoken";

//Schema and Model
import { User, UserDocument } from "src/user/model/user.schema";

@Injectable()
export class AuthGaurd implements CanActivate {
    //Constructor
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async canActivate(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context).getContext();
        if (!ctx.headers.authorization) {
            return false;
        }
        ctx.user = await this.validateToken(ctx.headers.authorization);
        const user = await this.userModel.findOne({
            email: ctx.user.info
        });
        if (user) {
            return true
        }
        return false;
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