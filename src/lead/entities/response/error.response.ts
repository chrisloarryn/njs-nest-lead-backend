import {ApiProperty} from "@nestjs/swagger";


class ErrorItemResponse {
    @ApiProperty({ type: String, default: 'Forbidden/BadRequest/InternalServer/etc' })
    private readonly name: string;

    @ApiProperty({ type: String, default: 'Something went wrong' })
    private readonly message: string;
    constructor(name: string, message: string) {
        this.name = name;
        this.message = message;
    }
}
export class ErrorResponse {
    @ApiProperty({ type: Boolean, default: false })
    private readonly success: boolean = false;

    @ApiProperty({ type: String, default: 'Something went wrong' })
    private readonly message: string;

    @ApiProperty({ type: ErrorItemResponse, isArray: true })
    private readonly errors: Record<string, unknown>[];
    constructor(message, errors) {
        this.message = message;
        this.errors = errors;
    }
}
