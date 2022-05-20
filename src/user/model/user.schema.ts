import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true, select: false })
    password: string;

    @Prop({ enum: ["user", "admin"], default: "user" })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);