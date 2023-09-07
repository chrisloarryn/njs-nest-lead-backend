import {Logger, Module} from '@nestjs/common';
import { LeadService } from './lead.service';
import { LeadController } from './lead.controller';
import {LoggerInterceptor} from "../common/interceptor/logger.interceptor";
import {HttpRequestsService} from "../common/services/axios.service";
import {HttpService} from "@nestjs/axios";
import {CustomAxiosModule} from "../common/modules/axios.module";

const providers = [LeadService, Logger, LoggerInterceptor];

@Module({
  imports: [CustomAxiosModule],
  controllers: [LeadController],
  providers
})
export class LeadModule {}
