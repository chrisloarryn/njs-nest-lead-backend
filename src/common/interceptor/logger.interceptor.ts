import { CallHandler, ExecutionContext,Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    constructor(
        private readonly logger: Logger
    ) {
        this.logger = new Logger(LoggerInterceptor.name);
    }

    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const { originalUrl, method } = context.switchToHttp().getRequest();
        const { statusCode } = context.switchToHttp().getResponse();

        return next.handle().pipe(
            map((data: unknown) => {
                const isArray = Array.isArray(data);

                const showData = isArray && data.length > 0 ? {} : data;

                this.logger.log(`${method} ${originalUrl}|Res-Code:${statusCode}|Res-Body: ${JSON.stringify(showData)}`, 'Response');

                // TODO: validate data type and check if it is an instance of BaseResponse or not
                return {
                    success: true,
                    data,
                }
            }),
        );
    }
}
