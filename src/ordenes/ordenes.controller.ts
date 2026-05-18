import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdenesService } from './ordenes.service';
import { CreateOrdeneDto } from './dto/create-ordene.dto';
import { UpdateOrdeneDto } from './dto/update-ordene.dto';
import { queryPaginator } from 'src/common/dto/dtoQuery';

@Controller()
export class OrdenesController {
  constructor(private readonly ordenesService: OrdenesService) {}

  @MessagePattern('createOrden')
  async create(@Payload() createOrdeneDto: CreateOrdeneDto) {
    const order= await this.ordenesService.create(createOrdeneDto)

    return this.ordenesService.createPaymentSession(order)
  }

  @MessagePattern('findAllOrdenes')
  findAll(@Payload() query:queryPaginator) {
    return this.ordenesService.findAll(query);
  }

  @MessagePattern('findOneOrden')
  findOne(@Payload('id',ParseUUIDPipe) id: string) {
    return this.ordenesService.findOne(id);

  }

  @MessagePattern('updateOrderStatus')
  updateOrderStatus(@Payload() updateOrdeneDto: UpdateOrdeneDto) {
    return this.ordenesService.update(updateOrdeneDto);
  }

}
