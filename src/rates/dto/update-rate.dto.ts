import { RateObject } from "../rates.service";
export class UpdateRateDto {
    timestamp: number;
    source: string;
    quotes:RateObject;
}