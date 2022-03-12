import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { RateObject } from "../rates.service";
export type RateDocument = Rate & Document;



@Schema()
export class Rate {
    @Prop()
    rateId: string;

    @Prop()
    timestamp: number;

    @Prop()
    source: string;

    @Prop({type:Object})
    quotes: RateObject
}

export const RateSchema = SchemaFactory.createForClass(Rate);


