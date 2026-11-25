import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkOrder } from './workorder.entity';
import { WorkOrderService } from './workorder.service';
import { WorkOrderController } from './workorder.controller';
@Module({ imports: [TypeOrmModule.forFeature([WorkOrder])], controllers: [WorkOrderController], providers: [WorkOrderService] })
export class WorkOrderModule {}
