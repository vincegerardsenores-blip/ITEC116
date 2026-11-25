import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';


          @Entity('materials')
          export class Material {
            @PrimaryGeneratedColumn() id: number;
            @Column({ name: 'MaterialName', type: 'varchar', length: 255 }) materialname: string;
@Column({ name: 'Unit', type: 'varchar', length: 255 }) unit: string;
@Column({ name: 'StockQty', type: 'decimal', precision: 12, scale: 2 }) stockqty: number;
@Column({ name: 'ReorderLevel', type: 'decimal', precision: 12, scale: 2 }) reorderlevel: number;
            @CreateDateColumn() createdAt: Date;
            @UpdateDateColumn() updatedAt: Date;
          }
