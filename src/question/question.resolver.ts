import { Resolver, Mutation, Query, Args, Context } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Service
import { QuestionService } from "./question.service";
//Guardss
import { AuthGaurd } from "src/helpers/auth.guard";
//Entity
import { CreateQuestionEntity } from "./entities/create-question.entity";
//Dto
import { CreateQuestionInput } from "./dto/create-question.input";

@Resolver()
export class QuestionResolver {
    //Constructor
    constructor(private readonly questionService: QuestionService) { }

    //Create Question Resolver
    @Mutation(() => CreateQuestionEntity, { name: "addQuestion" })
    @UseGuards(new AuthGaurd())
    createQuestion(
        @Args('createQuestionInput')
        createQuestionInput: CreateQuestionInput
    ) {
        return this.questionService.create(createQuestionInput)
    }
}