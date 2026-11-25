import { IsString, IsNumber, IsInt, IsEmail, IsDateString, IsOptional, IsNotEmpty, IsIn, Min, Max } from 'class-validator';
          import { PartialType } from '@nestjs/mapped-types';
          export class CreateProductionLogDto {
            @IsInt() @Min(0) quantityproduced: number;
@IsInt() @Min(0) downtimeminutes: number;
@IsDateString() @IsOptional() loggedat: Date;
@IsInt() @Min(1) workorderid: number;
          }
          export class UpdateProductionLogDto extends PartialType(CreateProductionLogDto) {}
