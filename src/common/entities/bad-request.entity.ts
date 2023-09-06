import {BadRequestException, HttpStatus} from "@nestjs/common";
import {ApiProperty} from "@nestjs/swagger";

export class BadRequestEntity extends BadRequestException {
  @ApiProperty({
    description: 'Error message',
    example: 'Bad Request',
    })
    message: string;
    @ApiProperty({
        description: 'Error code',
        example: HttpStatus.BAD_REQUEST,
    })
    code: number;

}
