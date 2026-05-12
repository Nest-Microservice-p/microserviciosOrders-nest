import { IsUUID } from 'class-validator';
import { EstadoOrden } from './estadOrden.dto';

export class UpdateOrdeneDto extends EstadoOrden {
  @IsUUID()
  id: string;


}
