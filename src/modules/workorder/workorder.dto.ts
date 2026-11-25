import { IsString, IsNumber, IsInt, IsEmail, IsDateString, IsOptional, IsNotEmpty, IsIn, Min, Max } from 'class-validator';
          import { PartialType } from '@nestjs/mapped-types';
          export class CreateWorkOrderDto {
            @IsString() @IsNotEmpty() workordercode: string;
@IsString() @IsNotEmpty() productname: string;
@IsInt() @Min(0) targetquantity: number;
@IsString() @IsNotEmpty() status: string;
          }
          export class UpdateWorkOrderDto extends PartialType(CreateWorkOrderDto) {}
