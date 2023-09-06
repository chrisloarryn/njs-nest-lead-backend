import { HttpException, HttpStatus } from '@nestjs/common';
import {ExceptionTitleList} from "../constants";
// TODO: Uncomment the following lines of code after creating the constants for managing internal error codes and exception titles
// import { StatusCodesList } from './../common/constants/status-codes-list.constants';

export class CustomBadRequestException extends HttpException {
    constructor(message?: string, code?: number) {
        super(
            {
                message: message || ExceptionTitleList.BadRequest,
                // code: code || StatusCodesList.BadRequest,
                statusCode: HttpStatus.BAD_REQUEST,
                error: true
            },
            HttpStatus.BAD_REQUEST
        );
    }
}
