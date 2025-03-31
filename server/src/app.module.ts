import { Module } from '@nestjs/common';
import { DanBadaromModule } from './dan-badarom/dan-badarom.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DanBadaromModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
