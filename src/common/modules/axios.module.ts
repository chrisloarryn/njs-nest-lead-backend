import {HttpModule, HttpService} from "@nestjs/axios";
import {Module} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

import {HttpRequestsService} from "../services/axios.service";

@Module({
    imports: [HttpModule],
    providers: [HttpRequestsService],
    exports: [HttpRequestsService],
})
export class CustomAxiosModule {

}

