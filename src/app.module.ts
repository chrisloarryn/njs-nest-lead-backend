import {Logger, Module} from '@nestjs/common';
import { LeadModule } from './lead/lead.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from "./configs/app.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    LeadModule,
  ],
})
export class AppModule {}
