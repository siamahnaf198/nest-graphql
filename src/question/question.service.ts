import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

//Schema
import { Question, QuestionDocument } from "./model/question.schema";
import { User, UserDocument } from "src/user/model/user.schema";
//Dto
import { CreateQuestionInput } from "./dto/create-question.input";
//Entity
import { CreateQuestionEntity } from "./entities/create-question.entity";


@Injectable()
export class QuestionService {
    //Contructor
    constructor(
        @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }

    //Create Question Service
    async create(createQuestionInput: CreateQuestionInput, email: string): Promise<CreateQuestionEntity> {
        const question = await this.questionModel.findOne({
            content: createQuestionInput.content
        });
        const user = await this.userModel.findOne({
            email: email
        })
        if (question) throw new NotFoundException("Question already exist!");
        await this.questionModel.create({ ...createQuestionInput, user: user._id });
        return {
            success: true,
            message: "Question added successfully!"
        }
    }

}