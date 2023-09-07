import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    Inject,
    Logger
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class CommonExceptionFilter implements ExceptionFilter {
    async catch(exception: HttpException, host: ArgumentsHost) {
        Logger.debug(exception, CommonExceptionFilter.name);

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const statusCode = exception.getStatus();

        const message = exception.getResponse() as {
            key: string;
            // rome-ignore lint/suspicious/noExplicitAny: <explanation>
            args: Record<string, any>;
        };

        const dataError = {
            meta: {
                error: message,
                statusCode,
            }
        };
        Logger.error(JSON.stringify(dataError), CommonExceptionFilter.name);

        const isStringMessage = typeof message === 'string';
        const isArrayOfErrors = !isStringMessage && Array.isArray(message['message']);
        Logger.debug(`isStringMessage: ${isStringMessage} | isArrayOfErrors: ${isArrayOfErrors}`, CommonExceptionFilter.name)
        const errors = isArrayOfErrors ? message['message'] : [message['message']];

        const errorsList = isArrayOfErrors && errors.length > 0 ?
            errors.map((json) => JSON.parse(json)) :
            [{ name: 'error', reason: message['message'] }];

        response.status(statusCode).json({
            success: false,
            message: isStringMessage ? message : "ha ocurrido un error",
            errors: errorsList
        });
    }
}
