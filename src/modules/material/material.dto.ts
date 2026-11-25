import { IsString, IsNumber, IsInt, IsEmail, IsDateString, IsOptional, IsNotEmpty, IsIn, Min, Max } from 'class-validator';
          import { PartialType } from '@nestjs/mapped-types';
          export class CreateMaterialDto {
            @IsString() @IsNotEmpty() materialname: string;
@IsString() @IsNotEmpty() unit: string;
@IsNumber({ maxDecimalPlaces: 2 }) @Min(0) stockqty: number;
@IsNumber({ maxDecimalPlaces: 2 }) @Min(0) reorderlevel: number;
          }
          export class UpdateMaterialDto extends PartialType(CreateMaterialDto) {}
