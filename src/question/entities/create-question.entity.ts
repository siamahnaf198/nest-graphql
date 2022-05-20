import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class CreateQuestionEntity {
    @Field(() => Boolean, { nullable: false })
    success: boolean;

    @Field(() => String, { nullable: false })
    message: string;
}