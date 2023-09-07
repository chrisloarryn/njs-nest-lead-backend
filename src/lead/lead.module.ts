import {Logger, Module} from '@nestjs/common';
import { LeadService } from './lead.service';
import { LeadController } from './lead.controller';
import {LoggerInterceptor} from "../common/interceptor/logger.interceptor";

@Module({
  controllers: [LeadController],
  providers: [LeadService, Logger, LoggerInterceptor]
})
export class LeadModule {}
