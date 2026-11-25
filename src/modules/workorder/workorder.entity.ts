import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';


          @Entity('work_orders')
          export class WorkOrder {
            @PrimaryGeneratedColumn() id: number;
            @Column({ name: 'WorkOrderCode', type: 'varchar', length: 255 }) workordercode: string;
@Column({ name: 'ProductName', type: 'varchar', length: 255 }) productname: string;
@Column({ name: 'TargetQuantity', type: 'int' }) targetquantity: number;
@Column({ name: 'Status', type: 'varchar', length: 255 }) status: string;
            @CreateDateColumn() createdAt: Date;
            @UpdateDateColumn() updatedAt: Date;
          }
