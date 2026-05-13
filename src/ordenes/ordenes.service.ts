import { HttpStatus, Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateOrdeneDto } from './dto/create-ordene.dto';
import { UpdateOrdeneDto } from './dto/update-ordene.dto';
import { PrismaPg } from '@prisma/adapter-pg';
import { envs } from 'src/config';
import { PrismaClient } from '@prisma/client';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { queryPaginator } from 'src/common/dto/dtoQuery';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class OrdenesService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('BaseDatos-Service');

  //  constructor(@Inject(envs.Product_Service) private readonly productClient:ClientProxy) {


  constructor(@Inject(envs.NAT_SERVICE) private readonly productClient:ClientProxy) {
    const adapter = new PrismaPg({
      connectionString: envs.DATABASE_URL,
    });

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Base de Datos Cargada Correctamente');
  }

  
  async create(createOrdeneDto: CreateOrdeneDto) {
    try {
      const ids=createOrdeneDto.Items.map(i=>i.productId)
      const productos:any[]=await firstValueFrom(this.productClient.send({cmd:'validateProducts'},ids));

      const costoTotal = createOrdeneDto.Items.reduce((acc, i) => {
        const product= productos.find(p => p.id === i.productId);
        return acc + (i.cantidad * product.price);
        }, 0);
      const totalProductos=createOrdeneDto.Items.reduce((acc,i)=>i.cantidad+acc,0)

      const ordersCreated=await 
        this.orden.create({
          data:{
            costoTotal,
            objetosTotales:totalProductos,
            ordenItem:{
              createMany:{
                data:createOrdeneDto.Items.map(or=>({
                  cantidad:or.cantidad,
                  productId:or.productId,
                  price:productos.find(p => p.id === or.productId).price
                }))
              }
            },
          },
          include:{
              ordenItem:{
                select:{
                  productId:true,
                  price:true,
                  cantidad:true
                }
              }
            }
        })

    return {
      ...ordersCreated,
      ordenItem:ordersCreated.ordenItem.map(i=>({...i,nombreProducto:productos.find(p=>p.id===i.productId).name}))
    }      
    } catch (error) {
      throw new RpcException({
        message:'Un error al guardar las ordenes',
        status:HttpStatus.BAD_REQUEST
      })
    }
  }  

  findAll(query:queryPaginator) {
    const {limit,paginator,estado}=query
    return this.orden.findMany({
      skip:(paginator-1) *limit,
      take:limit,
      where:{
        estado
      }
    })
  }

  async findOne(id: string) {
    const orden= await this.orden.findFirst({where:{id}, include:{
              ordenItem:{
                select:{
                  productId:true,
                  price:true,
                  cantidad:true
                }
              }
            }})

      if(!orden)throw new RpcException({message:'No se ha encontrado el producto solicitado '+id,
      status:HttpStatus.BAD_REQUEST
    })

    const productos:any[]=await firstValueFrom(this.productClient.send({cmd:'validateProducts'},orden.ordenItem.map(i=>i.productId)));


    return {
      ...orden,
      ordenItem:orden.ordenItem.map(i=>({...i,nombreProducto:productos.find(p=>p.id===i.productId).name}))
    }
    }
  

  async update(updateOrdeneDto: UpdateOrdeneDto) {
    const orden= await this.findOne(updateOrdeneDto.id)
    if(orden.estado===updateOrdeneDto.estado)return orden


    return this.orden.update({where:{id:updateOrdeneDto.id},data:{estado:updateOrdeneDto.estado}})
  }

}
