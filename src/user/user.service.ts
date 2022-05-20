import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

//Dto
import { CreateUserInput } from "./dto/create-user.input";
import { LoginUserInput } from "./dto/login-user.input";
//Entity
import { CreateUserEntity } from "./entities/create-user.entity";
//Schema and Model
import { User, UserDocument } from "./model/user.schema";

@Injectable()
export class UserService {
    //Constructor
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    //Get User Services
    async getOne(email: string) {
        const user = await this.userModel.findOne({
            email: email
        })
        if (!user) throw new NotFoundException("User not found!");
        return user;
    }

    //Create User Services
    async create(createUserInput: CreateUserInput): Promise<CreateUserEntity> {
        const user = await this.userModel.findOne({
            email: createUserInput.email
        });
        if (user) throw new NotFoundException("User already registered!");
        const password = await bcrypt.hash(createUserInput.password, 12);
        await this.userModel.create({ ...createUserInput, password });
        const token = jwt.sign({ info: createUserInput.email }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
        let date: any = new Date();
        return {
            success: true,
            message: "User Registration Successful!",
            token,
            expire: date
        }
    }

    //Login User Services
    async login(loginUserInput: LoginUserInput): Promise<CreateUserEntity> {
        const user = await this.userModel.findOne({
            email: loginUserInput.email
        }).select("+password")
        if (!user) throw new NotFoundException("Email or password is wrong!");
        const verifyPassword = await bcrypt.compare(loginUserInput.password, user.password);
        if (!verifyPassword) throw new NotFoundException("Email or password is wrong!")
        const token = jwt.sign({ info: loginUserInput.email }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
        let date: any = new Date();
        return {
            success: true,
            message: "User Registration Successful!",
            token,
            expire: date
        }
    }
}