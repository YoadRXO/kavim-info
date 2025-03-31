import { Module } from '@nestjs/common';
import { ProxyController } from './dan-badarom.controller';

@Module({
  controllers: [ProxyController],
  providers: [],
})
export class DanBadaromModule {}
