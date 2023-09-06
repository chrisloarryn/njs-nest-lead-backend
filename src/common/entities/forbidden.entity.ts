import {ForbiddenException, HttpStatus} from "@nestjs/common";
import {ApiProperty} from "@nestjs/swagger";

export class ForbiddenErrorEntity extends ForbiddenException {
  @ApiProperty({
    description: 'Error message',
    example: 'Forbidden Error',
    })
    message: string;

    @ApiProperty({
        description: 'Error code',
        example: HttpStatus.FORBIDDEN,
    })
    code: number;

}
