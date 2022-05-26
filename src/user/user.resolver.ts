import { Resolver, Args, Mutation, Query, Context } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Gaurds
import { AuthGaurd } from "src/auth/auth.guard";
//Services
import { UserService } from "./user.service";
//Dto
import { CreateUserInput } from "./dto/create-user.input";
import { LoginUserInput } from "./dto/login-user.input";
//Entity
import { CreateUserEntity } from "./entities/create-user.entity";
import { GetUser } from "./entities/get-user.entity";
import { UserToken } from "src/auth/entities/authGuard.entity";

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    //Get User Resolver
    @Query(() => GetUser, { name: "getUser" })
    @UseGuards(AuthGaurd)
    getUser(@Context('user') user: UserToken) {
        return this.userService.getOne(user.info)
    }

    //Create User Resolver
    @Mutation(() => CreateUserEntity, { name: "addUser" })
    createUser(
        @Args('createUserInput')
        createUserInput: CreateUserInput
    ) {
        return this.userService.create(createUserInput)
    }

    //Login User Resolver
    @Mutation(() => CreateUserEntity, { name: "loginUser" })
    loginUser(
        @Args('loginUserInput')
        loginUserInput: LoginUserInput
    ) {
        return this.userService.login(loginUserInput)
    }
}
