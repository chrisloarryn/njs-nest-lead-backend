import { IsNumber } from 'class-validator';

export class DeleteLeadDto {
  @IsNumber()
  id: number;
}
