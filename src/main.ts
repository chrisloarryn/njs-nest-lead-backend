import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {Logger, ValidationPipe, VersioningType} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {Environment, varMsjApp} from "./common/enums";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI
  });

  const config = app.get(ConfigService);

  const options = new DocumentBuilder().build();

  const globalPrefix = process.env.GLOBAL_PREFIX || varMsjApp.APP_DEFAULT_GLOBAL_PREFIX;
  const port = config.get('config.port');
  const environment = config.get('config.nodeEnv');

  const configSwagger = new DocumentBuilder()
      .setTitle(process.env.SWAGGER_NAME || varMsjApp.APP_DEFAULT_SWAGGER_NAME)
      .setDescription(process.env.SWAGGER_DESCRIPTION || varMsjApp.APP_DEFAULT_SWAGGER_DESCRIPTION)
      .setVersion(process.env.SWAGGER_VERSION || varMsjApp.APP_DEFAULT_SWAGGER_VERSION)
      .setContact(process.env.SWAGGER_CONTACT_NAME || varMsjApp.APP_DEFAULT_SWAGGER_CONTACT_NAME, "",
          process.env.SWAGGER_CONTACT_EMAIL || varMsjApp.APP_DEFAULT_SWAGGER_CONTACT_EMAIL)

  if (['production', 'development'].includes(process.env.NODE_ENV)) {
    configSwagger.addServer("prod url here");
  } else {
    configSwagger
        .addServer(`http://localhost:${port}/api`)
        .addServer("prod url here");
  }

  if (environment !== Environment.PRODUCTION) {
    const document = SwaggerModule.createDocument(app, configSwagger.build(), {
      deepScanRoutes: true,
    });
    const swaggerPath = process.env.SWAGGER_URL || varMsjApp.APP_DEFAULT_SWAGGER_URL;
    const path = `${globalPrefix}/${swaggerPath}`;
    Logger.debug(`Swagger path: ${path}`);
    SwaggerModule.setup(path, app, document, {
      swaggerOptions: {
        // filter: true,
        showRequestDuration: true,
        persistAuthorization: true,
      },
    });
  }

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    disableErrorMessages: environment === Environment.PRODUCTION,
    forbidNonWhitelisted: true,
    // strong dto validation
    forbidUnknownValues: true,
    // transform payload to dto
    transformOptions: {
      enableImplicitConversion: true
    }
  }));

  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.setGlobalPrefix(globalPrefix);

  // Starts listening for shutdown hooks
  if (environment === Environment.PRODUCTION) {
    app.enableShutdownHooks();
  }

  Logger.debug(`Environment: ${environment}`);

  // check if port is available
  await app.listen(port);
}
bootstrap();
