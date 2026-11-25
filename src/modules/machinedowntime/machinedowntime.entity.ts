import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { WorkOrder } from '../workorder/workorder.entity';

          @Entity('machine_downtimes')
          export class MachineDowntime {
            @PrimaryGeneratedColumn() id: number;
            @Column({ name: 'MachineName', type: 'varchar', length: 255 }) machinename: string;
@Column({ name: 'Reason', type: 'text' }) reason: string;
@Column({ name: 'StartTime', type: 'datetime' }) starttime: Date;
@Column({ name: 'EndTime', type: 'datetime', nullable: true }) endtime: Date;
@ManyToOne(() => WorkOrder, { onDelete: 'RESTRICT' }) @JoinColumn({ name: 'WorkOrderID' }) workorder: WorkOrder;
            @CreateDateColumn() createdAt: Date;
            @UpdateDateColumn() updatedAt: Date;
          }
