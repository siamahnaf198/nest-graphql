import { ObjectType, Field } from "@nestjs/graphql";
import { DateScalar } from "src/date.scaler";

//Create and Login User Entity
@ObjectType()
export class CreateUserEntity {
    @Field(() => Boolean, { nullable: false })
    success: boolean;

    @Field(() => String, { nullable: false })
    message: string;

    @Field(() => String, { nullable: false })
    token: string;

    @Field({ nullable: false })
    expire: DateScalar;
}