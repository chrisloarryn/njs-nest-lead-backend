import {BadRequestException, Injectable, Logger} from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import {HttpRequestsService} from "../common/services/axios.service";
import {firstValueFrom, lastValueFrom} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable()
export class LeadService {
  constructor(
      private readonly httpRS: HttpRequestsService
  ) {
  }
  async create(
      createLeadDto: CreateLeadDto,
      statusCode: string = "201",
      ) {
    const url = '/leads';

    // TODO: delete this, only for testing
    const additionalHeaders: Record<string, string> = {
      'x-status-code': statusCode,
    };

    const { data } = await firstValueFrom(
        this.httpRS.makePostRequest(url, createLeadDto, additionalHeaders).pipe(
            catchError((error) => {
              Logger.error('Error al crear lead');
              Logger.error(error);
              throw error;
            }),
        ),
    );

    Logger.debug(JSON.stringify(data), LeadService.name);

    return data;
  }

  async findAll(statusCode: string = "200") {
    const url = '/leads';

    const additionalHeaders: Record<string, string> = {
      'x-status-code': statusCode,
    }

    const { data } = await lastValueFrom(this.httpRS.makeGetRequest(url, additionalHeaders).pipe(
        catchError((error) => {
          Logger.error('Error al obtener leads');
          Logger.error(error);
          throw error;
        }),
    ));

    Logger.debug(JSON.stringify(data), LeadService.name);

    return data;
  }

  async findOne(id: number, statusCode: string = "200") {
    const url = `/leads/${id}`;

    const additionalHeaders: Record<string, string> = {
        'x-status-code': statusCode,
    }

    const { data } = await lastValueFrom(
        this.httpRS.makeGetRequest(url, additionalHeaders).pipe(
            catchError((error) => {
                Logger.error('Error al obtener lead');
                Logger.error(error);
                throw error;
            }),
        ),
    );
    Logger.debug(JSON.stringify(data), LeadService.name);

    return data;
  }

  async update(id: number, updateLeadDto: UpdateLeadDto, statusCode: string) {
    const url = `/leads/${id}`;

    const additionalHeaders: Record<string, string> = {
      'x-status-code': statusCode,
    }

    const { data } = await lastValueFrom(
        this.httpRS.makePatchRequest(url, updateLeadDto, additionalHeaders).pipe(
            catchError((error) => {
              Logger.error('Error al actualizar lead');
              Logger.error(error);
              throw error;
            }),
        ),
    );

    Logger.debug(JSON.stringify(data), LeadService.name);

    return data;
  }

  remove(id: number) {
    return `This action removes a #${id} lead`;
  }
}
