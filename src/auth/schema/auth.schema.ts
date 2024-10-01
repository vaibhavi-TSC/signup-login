import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()

export class Auth extends Document{

    @Prop()
    password: string;

    @Prop()
    name: string;

    @Prop()
    email: string;
}

export const AuthSchema =SchemaFactory.createForClass(Auth);
