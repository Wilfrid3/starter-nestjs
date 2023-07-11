import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import expressBasicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
    }),
  );

  // app.use(
  //   ['/api'],
  //   expressBasicAuth({
  //     challenge: true,
  //     users: {
  //       kalio: 'T4L2K4W4V2q6h4h',
  //     },
  //   }),
  // );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Kaya API')
    .setDescription('The backend api for kaya project')
    .setVersion('1.0')
    .addTag('Kaya')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3300;

  await app.listen(port, function () {
    console.log('Server running in PORT ' + port);
  });
}
bootstrap();
