import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

//Question Resolver and Service
import { QuestionResolver } from "./question.resolver";
import { QuestionService } from "./question.service";

//Schema
import { Question, QuestionSchema } from "./model/question.schema";
import { User, UserSchema } from "src/user/model/user.schema";


@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Question.name,
            schema: QuestionSchema
        }]),
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        }])
    ],
    providers: [QuestionResolver, QuestionService]
})

export class QuestionModule { }