import { Module } from '@nestjs/common';
import { OrdenesModule } from './ordenes/ordenes.module';

@Module({
  imports: [OrdenesModule],
})
export class AppModule {}
