import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.use(cors({ origin: '*' }));

  await app.listen(8080);
  console.log('NestJS app running on port 3000');
}
bootstrap();
