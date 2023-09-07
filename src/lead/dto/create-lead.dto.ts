import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { ClasificationEnum, StatusEnum, LeadType } from './../enums';
import { ApiProperty } from '@nestjs/swagger';
import {ErrorMessagesDTO} from "../../common/enums";

export class CreateLeadDto {
  @ApiProperty()
  @IsString(
      {message: ErrorMessagesDTO.InvalidString}
  )
  id: string;

  @ApiProperty()
  @IsString(
        {message: ErrorMessagesDTO.InvalidString}
  )
  rut: string;

  @ApiProperty()
  @IsString()
  dv: string;

  @ApiProperty()
  @IsString()
  primerNombre: string;

  @ApiProperty()
  @IsString()
  segundoNombre: string;

  @ApiProperty()
  @IsString()
  primerApellido: string;

  @ApiProperty()
  @IsString()
  segundoApellido: string;

  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  telMovil: string;

  @ApiProperty()
  @IsString()
  canalRegistro: string;

  @ApiProperty()
  @IsString()
  sucursal: string;

  @ApiProperty({ enum: ClasificationEnum, default: ClasificationEnum.Frio })
  @IsEnum(ClasificationEnum)
  clasificacion: ClasificationEnum;

  @ApiProperty({ enum: StatusEnum, default: StatusEnum.SinGestion })
  @IsEnum(StatusEnum)
  estado: StatusEnum;

  @ApiProperty({ enum: LeadType, default: LeadType.Trabajador })
  @IsEnum(LeadType)
  tipoLead: LeadType;

  @IsOptional()
  prioridad: string;

  @IsOptional()
  ejecutivoAsignado: string;

  @ApiProperty()
  @IsString()
  direccion: string;

  @ApiProperty()
  @IsString()
  ciudad: string;

  @ApiProperty()
  @IsString()
  comuna: string;

  @ApiProperty()
  @IsString()
  region: string;
}
