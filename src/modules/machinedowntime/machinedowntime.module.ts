import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MachineDowntime } from './machinedowntime.entity';
import { MachineDowntimeService } from './machinedowntime.service';
import { MachineDowntimeController } from './machinedowntime.controller';
@Module({ imports: [TypeOrmModule.forFeature([MachineDowntime])], controllers: [MachineDowntimeController], providers: [MachineDowntimeService] })
export class MachineDowntimeModule {}
