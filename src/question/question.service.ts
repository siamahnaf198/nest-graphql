import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

//Schema
import { Question, QuestionDocument } from "./model/question.schema";
//Dto
import { CreateQuestionInput } from "./dto/create-question.input";
//Entity
import { CreateQuestionEntity } from "./entities/create-question.entity";


@Injectable()
export class QuestionService {
    //Contructor
    constructor(@InjectModel(Question.name) private questionModel: Model<QuestionDocument>) { }

    //Create Question Service
    async create(createQuestionInput: CreateQuestionInput): Promise<CreateQuestionEntity> {
        const question = await this.questionModel.findOne({
            content: createQuestionInput.content
        });
        if (question) throw new NotFoundException("Question already exist!");
        await this.questionModel.create({ ...createQuestionInput });
        return {
            success: true,
            message: "Question added successfully!"
        }
    }

}