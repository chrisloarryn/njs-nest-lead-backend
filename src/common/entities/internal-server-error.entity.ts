import {HttpStatus, InternalServerErrorException} from "@nestjs/common";
import {ApiProperty} from "@nestjs/swagger";

export class InternalServerErrorEntity extends InternalServerErrorException {
  @ApiProperty({
    description: 'Error message',
    example: 'Internal Server Error',
    })
    message: string;
    @ApiProperty({
        description: 'Error code',
        example: HttpStatus.INTERNAL_SERVER_ERROR,
    })
    code: number;

}
