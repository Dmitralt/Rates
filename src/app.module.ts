import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HttpModule } from '@nestjs/axios';


import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RatesModule } from './rates/rates.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/demo'), RatesModule,HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
