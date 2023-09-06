import {ConflictException, HttpStatus} from "@nestjs/common";
import {ApiProperty} from "@nestjs/swagger";

export class ConflictErrorEntity extends ConflictException {
  @ApiProperty({
    description: 'Error message',
    example: 'Conflict Error',
    })
    message: string;

    @ApiProperty({
        description: 'Error code',
        example: HttpStatus.CONFLICT,
    })
    code: number;

}
