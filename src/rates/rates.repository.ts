import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Rate,RateDocument } from "./schemas/rate.schema";
import {FilterQuery,Model} from"mongoose"

@Injectable()

export class RatesRepository{


    constructor(@InjectModel(Rate.name) private RateModel:Model<RateDocument>){}

    async findOne(rateFilterQuery:FilterQuery<Rate>):Promise<Rate>{

        return this.RateModel.findOne(rateFilterQuery)
    }

    async find(rateFilterQuery:FilterQuery<Rate>):Promise<Rate[]>{

        return this.RateModel.find(rateFilterQuery)
    }


    async create(rate:Rate):Promise<Rate>{

        const newRate=new this.RateModel(rate)
        return newRate.save()
    }

    async findOneAndUpdate(rateFilterQuery:FilterQuery<Rate>,rate:Partial<Rate>):Promise<Rate>{
        return this.RateModel.findOneAndUpdate(rateFilterQuery,rate)

    }
}