import { Body, Controller, Get, Param,Query, Patch, Post } from '@nestjs/common';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';

import { Rate } from './schemas/rate.schema';
import { RatesService } from './rates.service';
import { RateObject } from "./rates.service";

import { Links } from 'src/constants';
const axios =require("axios")
const timestamp =require('timestamp') 

 const timestampOneDay:number=86400;
@Controller('currency-rate')
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  @Get()
  async getRates(@Query() query): Promise<string> {
    let timeNow:number=Math.floor(Date.now() / 1000)

    if(query.currency==undefined||query.base==undefined)
    {
      return "please send wright parametrs";
    }
    else
    {    
      if(!Object.keys(Links).includes(query.base))
      {
        return `choose one of this base = ${Object.keys(Links)}`
      }
     
       
      let curentdata = await this.ratesService.getRate({"souce":query.base});

      let respounce;
      if(curentdata==null)
      {
        console.log("NO data")
        // respounce= testReqObj;//test   change to the link
        respounce = await  axios.get(Links[query.base])
        respounce=respounce.data
        console.log("write new data to the mongo DB")
        await this.ratesService.createRate(respounce.timestamp, respounce.source,respounce.quotes)
      }
      else if(timeNow-curentdata.timestamp>timestampOneDay)
      {
        console.log("timestamp error DB timestamp=",curentdata.timestamp,"  current = ",timeNow)
        //respounce= testReqObj;//test   change to the link
        respounce = await  axios.get(Links[query.base])
        respounce=respounce.data

        console.log("write new data to the mongo DB ",respounce.timestamp)
        await this.ratesService.updateRate(curentdata.rateId, {timestamp:respounce.timestamp,source:respounce.source,quotes:respounce.quotes});
      
      }
      else
      {
        console.log("used old data from mongo DB")
        respounce=curentdata
       
      }
      let answer:string= respounce.quotes[`${query.base}${query.currency}`]


      if(answer!=undefined)
      {
        let str:string=`currency=${query.currency} and base=${query.base}  and answer=${answer}`
        return str
      }
      else
      {
        return `please choose another  curency `
      }
    }


  }
  
}
/*
var testReqObj={"success":true,
"terms":"https:\/\/currencylayer.com\/terms",
"privacy":"https:\/\/currencylayer.com\/privacy",
"timestamp":1646986264,
"source":"USD",
"quotes":

{"USDAED":3.67301,
"USDAFN":88.932977,
"USDALL":112.358426,
"USDAMD":521.394475,
"USDANG":1.810876,
"USDAOA":472.982502,
"USDARS":108.770079,
"USDAUD":1.362286,
"USDAWG":1.80025,
"USDAZN":1.696955,
"USDBAM":1.779961,
"USDBBD":2.028749,
"USDBDT":86.434809,
"USDBGN":1.778599,
"USDBHD":0.377037,
"USDBIF":2059.764926,
"USDBMD":1,
"USDBND":1.365938,
"USDBOB":6.907997,
"USDBRL":5.012201,
"USDBSD":1.004728,
"USDBTC":2.5514115e-5,
"USDBTN":76.634797,
"USDBWP":11.663034,
"USDBYN":3.303134,
"USDBYR":19600,
"USDBZD":2.025291,
"USDCAD":1.277405,
"USDCDF":2015.00009,
"USDCHF":0.93124,
"USDCLF":0.029065,
"USDCLP":802.000151,
"USDCNY":6.321102,
"USDCOP":3818.67,
"USDCRC":652.402816,
"USDCUC":1,
"USDCUP":26.5,
"USDCVE":100.353122,
"USDCZK":22.99765,
"USDDJF":178.876143,
"USDDKK":6.780697,
"USDDOP":55.091166,
"USDDZD":142.679604,
"USDEGP":15.724596,
"USDERN":15.000019,
"USDETB":51.539431,
"USDEUR":0.911202,
"USDFJD":1.990501,
"USDFKP":0.72792,
"USDGBP":0.764955,
"USDGEL":3.29016,
"USDGGP":0.72792,
"USDGHS":7.08383,
"USDGIP":0.72792,
"USDGMD":53.349979,
"USDGNF":8992.67841,
"USDGTQ":7.744513,
"USDGYD":210.125868,
"USDHKD":7.823875,
"USDHNL":24.740288,
"USDHRK":6.895796,
"USDHTG":107.096346,
"USDHUF":346.567983,
"USDIDR":14311.75,
"USDILS":3.26028,
"USDIMP":0.72792,
"USDINR":76.6227,
"USDIQD":1466.456742,
"USDIRR":42325.000118,
"USDISK":132.569908,
"USDJEP":0.72792,
"USDJMD":154.229784,
"USDJOD":0.708993,
"USDJPY":116.788039,
"USDKES":114.1501,
"USDKGS":103.121401,
"USDKHR":4077.338563,
"USDKMF":448.303924,
"USDKPW":900.000157,
"USDKRW":1235.819571,
"USDKWD":0.30383,
"USDKYD":0.837273,
"USDKZT":523.605189,
"USDLAK":11534.712711,
"USDLBP":1519.37787,
"USDLKR":256.21507,
"USDLRD":153.815111,
"USDLSL":15.01986,
"USDLTL":2.95274,
"USDLVL":0.60489,
"USDLYD":4.676808,
"USDMAD":9.845737,
"USDMDL":18.512748,
"USDMGA":4061.794966,
"USDMKD":56.074554,
"USDMMK":1786.62183,
"USDMNT":2858.831164,
"USDMOP":8.093702,
"USDMRO":356.999828,
"USDMUR":44.350054,
"USDMVR":15.450113,
"USDMWK":806.63272,
"USDMXN":21.00247,
"USDMYR":4.193981,
"USDMZN":63.829826,
"USDNAD":15.019596,
"USDNGN":415.840536,
"USDNIO":35.935403,
"USDNOK":8.96193,
"USDNPR":122.607536,
"USDNZD":1.46033,
"USDOMR":0.385004,
"USDPAB":1.004728,
"USDPEN":3.747253,
"USDPGK":3.540392,
"USDPHP":52.319499,
"USDPKR":180.104022,
"USDPLN":4.35795,
"USDPYG":7001.788306,
"USDQAR":3.640981,
"USDRON":4.509196,
"USDRSD":107.054804,
"USDRUB":134.51184,
"USDRWF":1032.885427,
"USDSAR":3.75157,
"USDSBD":8.048322,
"USDSCR":14.415383,
"USDSDG":447.00001,
"USDSEK":9.72298,
"USDSGD":1.359445,
"USDSHP":1.377398,
"USDSLL":11725.000206,
"USDSOS":586.000187,
"USDSRD":20.609502,
"USDSTD":20697.981008,
"USDSVC":8.791369,
"USDSYP":2511.999776,
"USDSZL":15.199603,
"USDTHB":33.279651,
"USDTJS":13.052619,
"USDTMT":3.5,
"USDTND":2.947017,
"USDTOP":2.26225,
"USDTRY":14.936875,
"USDTTD":6.829146,
"USDTWD":28.388499,
"USDTZS":2314.99982,
"USDUAH":29.54036,
"USDUGX":3638.341054,
"USDUSD":1,
"USDUYU":42.971235,
"USDUZS":10970.699988,
"USDVEF":213830222338.07285,
"USDVND":22875,
"USDVUV":113.671414,
"USDWST":2.612343,
"USDXAF":596.973075,
"USDXAG":0.038708,
"USDXAU":0.000503,
"USDXCD":2.70255,
"USDXDR":0.726341,
"USDXOF":596.973075,
"USDXPF":109.049759,
"USDYER":250.299865,
"USDZAR":15.08445,
"USDZMK":9001.192858,
"USDZMW":18.286684,
"USDZWL":321.999592}

}*/