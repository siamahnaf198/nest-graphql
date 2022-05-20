import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "src/user/model/user.schema";

export type QuestionDocument = Question & Document;

@Schema({ timestamps: true })
export class Question {
    @Prop({ required: true, type: String })
    content: string;

    @Prop({ type: Number })
    answerNumber: number

    @Prop({ type: String })
    answerString: string;

    @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
    user: User;
}

export const QuestionSchema = SchemaFactory.createForClass(Question)