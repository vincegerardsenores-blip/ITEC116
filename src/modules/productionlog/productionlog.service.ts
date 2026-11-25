import { Injectable, NotFoundException } from '@nestjs/common';
          import { InjectRepository } from '@nestjs/typeorm';
          import { Repository } from 'typeorm';
          import { ProductionLog } from './productionlog.entity';
          import { CreateProductionLogDto, UpdateProductionLogDto } from './productionlog.dto';

          @Injectable()
          export class ProductionLogService {
            constructor(@InjectRepository(ProductionLog) private readonly repo: Repository<ProductionLog>) {}

            findAll() {
              return this.repo.find({ relations: ['workorder'], order: { id: 'DESC' } });
            }

            async findOne(id: number) {
              const item = await this.repo.findOne({ where: { id }, relations: ['workorder'] });
              if (!item) throw new NotFoundException('ProductionLog not found');
              return item;
            }

            async create(dto: CreateProductionLogDto) {
              const data: any = { ...dto };
              data.workorder = { id: dto.workorderid };
              delete data.workorderid;
              return this.repo.save(this.repo.create(data));
            }

            async update(id: number, dto: UpdateProductionLogDto) {
              const item = await this.findOne(id);
              const data: any = { ...dto };
              if (dto.workorderid !== undefined) data.workorder = { id: dto.workorderid };
              delete data.workorderid;
              Object.assign(item, data);
              return this.repo.save(item);
            }

            async remove(id: number) {
              const item = await this.findOne(id);
              await this.repo.remove(item);
              return { deleted: true, id };
            }

            async count() {
              return { total: await this.repo.count() };
            }
          }
