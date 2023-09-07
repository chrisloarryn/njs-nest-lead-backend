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
  @IsString({
        message: ErrorMessagesDTO.InvalidString
  })
  dv: string;

  @ApiProperty()
  @IsString({
        message: ErrorMessagesDTO.InvalidString
  })
  primerNombre: string;

  @ApiProperty()
  @IsString({
        message: ErrorMessagesDTO.InvalidString
  })
  segundoNombre: string;

  @ApiProperty()
  @IsString({
        message: ErrorMessagesDTO.InvalidString
  })
  primerApellido: string;

  @ApiProperty()
  @IsString({
        message: ErrorMessagesDTO.InvalidString
  })
  segundoApellido: string;

  @ApiProperty({ example: 'email@email.com' })
  @IsEmail({
        allow_display_name: true,
        allow_utf8_local_part: true,
        require_tld: true,
      },
      {
        message: ErrorMessagesDTO.InvalidEmail,
      }
  )
  email: string;

  @ApiProperty()
  @IsString({
        message: ErrorMessagesDTO.InvalidString
  })
  telMovil: string;

  @ApiProperty()
  @IsString({
        message: ErrorMessagesDTO.InvalidString
  })
  canalRegistro: string;

  @ApiProperty()
  @IsString({
        message: ErrorMessagesDTO.InvalidString
  })
  sucursal: string;

  @ApiProperty({ enum: ClasificationEnum, default: ClasificationEnum.Frio })
  @IsEnum(ClasificationEnum, {
        message: ErrorMessagesDTO.InvalidEnum
  })
  clasificacion: ClasificationEnum;

  @ApiProperty({ enum: StatusEnum, default: StatusEnum.SinGestion })
  @IsEnum(StatusEnum, {
        message: ErrorMessagesDTO.InvalidEnum
  })
  estado: StatusEnum;

  @ApiProperty({ enum: LeadType, default: LeadType.Trabajador })
  @IsEnum(LeadType, {
        message: ErrorMessagesDTO.InvalidEnum
  })
  tipoLead: LeadType;

  @ApiProperty()
  @IsOptional()
  @IsString({
        message: ErrorMessagesDTO.InvalidString
  })
  prioridad: string;

  @ApiProperty()
  @IsString({
        message: ErrorMessagesDTO.InvalidString
  })
  @IsOptional()
  ejecutivoAsignado: string;

  @ApiProperty()
  @IsString({
        message: ErrorMessagesDTO.InvalidString
  })
  direccion: string;

  @ApiProperty()
  @IsString({
        message: ErrorMessagesDTO.InvalidString
  })
  ciudad: string;

  @ApiProperty()
  @IsString({
        message: ErrorMessagesDTO.InvalidString
  })
  comuna: string;

  @ApiProperty()
  @IsString({
        message: ErrorMessagesDTO.InvalidString
  })
  region: string;
}
