import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { UpdateRateDto } from "./dto/update-rate.dto";

import { Rate } from "./schemas/rate.schema";
import { RatesRepository } from "./rates.repository";

export type RateObject ={  [x: string]: number};



@Injectable()
export class RatesService {
    constructor(private readonly ratesRepository: RatesRepository) {}

    async getRateById(rateId: string): Promise<Rate> {
        return this.ratesRepository.findOne({ rateId })
    }

    async getRate(condition): Promise<Rate> {
        return this.ratesRepository.findOne(condition);
    }

    async createRate(timestamp:number,source:string,quotes:RateObject): Promise<Rate> {
        return this.ratesRepository.create({
            rateId: uuidv4(),
            timestamp,
            source,
            quotes
        })
    }

    async updateRate(rateId: string, rateUpdates: UpdateRateDto): Promise<Rate> {
        return this.ratesRepository.findOneAndUpdate({ rateId }, rateUpdates);
    }
}