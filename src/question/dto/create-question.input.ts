import { Field, Float, InputType } from "@nestjs/graphql";

@InputType()
export class CreateQuestionInput {
    @Field(() => String, { nullable: false })
    content: string;

    @Field(() => Float, { nullable: true })
    answerNumber: number

    @Field(() => String, { nullable: false })
    answerString: string;
}