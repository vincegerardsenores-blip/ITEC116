import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { WorkOrder } from '../workorder/workorder.entity';

          @Entity('production_logs')
          export class ProductionLog {
            @PrimaryGeneratedColumn() id: number;
            @Column({ name: 'QuantityProduced', type: 'int' }) quantityproduced: number;
@Column({ name: 'DowntimeMinutes', type: 'int' }) downtimeminutes: number;
@Column({ name: 'LoggedAt', type: 'datetime', nullable: true }) loggedat: Date;
@ManyToOne(() => WorkOrder, { onDelete: 'RESTRICT' }) @JoinColumn({ name: 'WorkOrderID' }) workorder: WorkOrder;
            @CreateDateColumn() createdAt: Date;
            @UpdateDateColumn() updatedAt: Date;
          }
