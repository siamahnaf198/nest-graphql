import { ObjectType, Field } from "@nestjs/graphql";

//Create and Login User Entity
@ObjectType()
export class UserToken {
    @Field()
    info: string;

    @Field()
    iat: number;

    @Field()
    exp: number;
}