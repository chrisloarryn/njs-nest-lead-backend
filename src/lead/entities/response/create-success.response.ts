import {ApiProperty} from "@nestjs/swagger";
import {Lead} from "../lead/lead.entity";

export class CreateSuccessResponse {
    @ApiProperty({ type: Boolean })
    private readonly success: boolean = true;

    @ApiProperty({ type: Lead })
    private readonly data: Lead;
    constructor(data) { this.data = data }
}
