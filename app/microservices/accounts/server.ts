import {
    NestFactory,
} from '@nestjs/core';

import config from '../../configs';

import {
    AppModule,
} from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT || config.port);
}

bootstrap();
