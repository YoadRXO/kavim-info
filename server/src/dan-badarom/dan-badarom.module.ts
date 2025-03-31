import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ProxyMiddleware } from './proxy.service';
import { ProxyController } from './dan-badarom.controller';

@Module({
  controllers: [ProxyController],
  providers: [],
})
export class DanBadaromModule {}
