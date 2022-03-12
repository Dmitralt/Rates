import { RateObject } from "../rates.service";
export class CreateRateDto {
    timestamp: number;
    source: string;
    quotes:RateObject
    
}