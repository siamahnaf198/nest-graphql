//Packages
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";


//USer Resolver and Service
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

//Schema
import { User, UserSchema } from "./model/user.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        }])
    ],
    providers: [UserResolver, UserService],
})

export class UserModule { }