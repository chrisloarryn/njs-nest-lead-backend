import { ApiProperty } from "@nestjs/swagger";

import { ClasificationEnum, StatusEnum } from '../../enums';

export class Lead {
  @ApiProperty({ type: 'integer', format: 'int64', default: 1 })
  id: number;

  @ApiProperty({ default: '12345678' })
  rut: string;

  @ApiProperty({ default: '9' })
  dv: string;

  @ApiProperty({ default: 'Jhon' })
  primerNombre: string;

  @ApiProperty({ default: 'Doe' })
  segundoNombre: string;

  @ApiProperty({ default: 'Doe' })
  primerApellido: string;

  @ApiProperty({ default: 'Doe'})
  segundoApellido: string;

  @ApiProperty({ default: 'jhon.doe@email.cl' })
  email: string;

  @ApiProperty({ default: '+56912345678' })
  telMovil: string;

  @ApiProperty({ default: 'Canal de registro' })
  canalRegistro: string;

  @ApiProperty({ default: 'Sucursal' })
  sucursal: string;

  @ApiProperty({ enum: ClasificationEnum, default: ClasificationEnum.Frio })
  clasificacion: ClasificationEnum;

  @ApiProperty({ enum: StatusEnum, default: StatusEnum.SinGestion })
  estado: StatusEnum;

  @ApiProperty({ enum: StatusEnum, default: StatusEnum.SinGestion })
  tipoLead: StatusEnum;

  @ApiProperty({ default: new Date() })
  fchRegistro: Date;

  @ApiProperty({ default: 'priority' })
  prioridad: string;

  @ApiProperty({ default: 'ejecutivo' })
  ejecutivoAsignado: string;

  @ApiProperty({ default: 'direccion' })
  direccion: string;

  @ApiProperty({ default: 'ciudad' })
  ciudad: string;

  @ApiProperty({ default: 'comuna' })
  comuna: string;

  @ApiProperty({ default: 'region' })
  region: string;
}
