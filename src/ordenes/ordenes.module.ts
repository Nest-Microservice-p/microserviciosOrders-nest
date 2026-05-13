import { Module } from '@nestjs/common';
import { OrdenesService } from './ordenes.service';
import { OrdenesController } from './ordenes.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config';

@Module({
  controllers: [OrdenesController],
  providers: [OrdenesService],
  imports:[

/*  ClientsModule.register([
      { name: envs.Product_Service, transport: Transport.TCP,
        options:{
          host:envs.productoMicroHost,
          port:envs.productoMicroPort
        }
       },
    ]), */

    ClientsModule.register([
       {
        name: envs.NAT_SERVICE,
        transport: Transport.NATS,
        options: {
          servers:  envs.NAT_SERVER,
        }
      },
    ]),
  ],
})
export class OrdenesModule {}
