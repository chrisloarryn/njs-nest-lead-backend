import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, HttpStatus, UseInterceptors, Headers
} from '@nestjs/common';
import { LeadService } from './lead.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { ApiResponse } from '@nestjs/swagger';
import {Lead} from "./entities/lead/lead.entity";
import {BadRequestEntity, ConflictErrorEntity, InternalServerErrorEntity, ForbiddenErrorEntity} from "../common/entities";
import {LoggerInterceptor} from "../common/interceptor/logger.interceptor";
import {
  ErrorResponse,
  CreateSuccessResponse,
  AllSuccessResponse,
  GetSuccessResponse,
  UpdateSuccessResponse
} from "./entities/response";

@Controller('leads')
@UseInterceptors(LoggerInterceptor)
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The record has been successfully created.',
    type: CreateSuccessResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request.',
    type: ErrorResponse
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error.',
    type: ErrorResponse
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflict.',
    type: ErrorResponse
  })
  create(
      @Headers('x-status-code') statusCode: string,
      @Body() createLeadDto: CreateLeadDto) {
    return this.leadService.create(createLeadDto, statusCode);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The records has been successfully retrieved.',
    type: AllSuccessResponse,
  })
  findAll(
      @Headers('x-status-code') statusCode: string,
  ) {
    return this.leadService.findAll(statusCode);
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully retrieved.',
    type: GetSuccessResponse,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden.',
    type: ErrorResponse
  })
  findOne(
      @Param('id') id: string,
      @Headers('x-status-code') statusCode: string,
  ) {
    return this.leadService.findOne(+id, statusCode);
  }

  @Patch(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully updated.',
    type: UpdateSuccessResponse,
  })
  update(
      @Param('id') id: string,
      @Body() updateLeadDto: UpdateLeadDto,
      @Headers('x-status-code') statusCode: string
  ) {
    return this.leadService.update(+id, updateLeadDto, statusCode);
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
