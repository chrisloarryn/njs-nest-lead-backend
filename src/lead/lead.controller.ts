import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, HttpStatus,
} from '@nestjs/common';
import { LeadService } from './lead.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { ApiResponse } from '@nestjs/swagger';
import {Lead} from "./entities/lead.entity";
import {BadRequestEntity, ConflictErrorEntity, InternalServerErrorEntity, ForbiddenErrorEntity} from "../common/entities";

@Controller('lead')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The record has been successfully created.',
    type: Lead,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request.',
    type: BadRequestEntity
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error.',
    type: InternalServerErrorEntity
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflict.',
    type: ConflictErrorEntity
  })
  create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadService.create(createLeadDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The records has been successfully retrieved.',
    type: [Lead],
  })
  findAll() {
    return this.leadService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully retrieved.',
    type: Lead,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden.',
    type: ForbiddenErrorEntity
  })
  findOne(@Param('id') id: string) {
    return this.leadService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully updated.',
    type: Lead,
  })
  update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
    return this.leadService.update(+id, updateLeadDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The record has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.leadService.remove(+id);
  }
}
