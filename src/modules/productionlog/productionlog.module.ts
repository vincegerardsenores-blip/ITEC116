import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionLog } from './productionlog.entity';
import { ProductionLogService } from './productionlog.service';
import { ProductionLogController } from './productionlog.controller';
@Module({ imports: [TypeOrmModule.forFeature([ProductionLog])], controllers: [ProductionLogController], providers: [ProductionLogService] })
export class ProductionLogModule {}
