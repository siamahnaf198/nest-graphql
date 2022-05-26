import { Resolver, Mutation, Query, Args, Context } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Service
import { QuestionService } from "./question.service";
//Guardss
import { AuthGaurd } from "src/auth/auth.guard";
import { RolesGuard } from "src/auth/role.guard";
import { Roles } from "src/auth/decorator/auth.decorator";
//Guard Enum
import { Role } from "src/auth/enum/auth.enum";
//Entity
import { CreateQuestionEntity } from "./entities/create-question.entity";
import { UserToken } from "src/auth/entities/authGuard.entity";
//Dto
import { CreateQuestionInput } from "./dto/create-question.input";

@Resolver()
export class QuestionResolver {
    //Constructor
    constructor(private readonly questionService: QuestionService) { }

    //Create Question Resolver
    @Mutation(() => CreateQuestionEntity, { name: "addQuestion" })
    @Roles(Role.ADMIN, Role.USER)
    @UseGuards(AuthGaurd, RolesGuard)
    createQuestion(
        @Args('createQuestionInput')
        createQuestionInput: CreateQuestionInput,
        @Context('user') user: UserToken
    ) {
        return this.questionService.create(createQuestionInput, user.info)
    }
}