import { ObjectType, Field } from "@nestjs/graphql";
import { DateScalar } from "../../date.scaler";

//Create and Login User Entity
@ObjectType()
export class GetUser {
    @Field(() => String, { nullable: false })
    name: string;

    @Field(() => String, { nullable: false })
    email: string;

    @Field()
    createdAt: DateScalar;

    @Field()
    updatedAt: DateScalar;
}