import { ValidatorOptions } from 'class-validator';

import { ValidationError, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {

	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('api/v1');

	app.useGlobalPipes(

		new ValidationPipe({

			exceptionFactory: (validationErrors: ValidationError[] = []) => {

				return new HttpException({

					ok: false,

					error: validationErrors.length > 0 && validationErrors[0].constraints && validationErrors[0].constraints.matches ? validationErrors[0].constraints.matches : 'bad request'
				}, HttpStatus.OK);
			},
		})
	);

	const config = new DocumentBuilder()

		.setTitle('API Document')

		.setDescription('The API Document')

		.setVersion('1.0')

		.addTag('API')

		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('api', app, document);

	await app.listen(3000);
}
bootstrap();
