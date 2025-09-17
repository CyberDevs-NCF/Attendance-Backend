import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Events extends Document {
    @Prop({ required: true})
    event_name: string;

    @Prop({ required: true})
    venue: string;

    @Prop({ required: true})
    date_time: Date;
}

export const EventSchema = SchemaFactory.createForClass(Events)