import { IsString, IsNumber, IsInt, IsEmail, IsDateString, IsOptional, IsNotEmpty, IsIn, Min, Max } from 'class-validator';
          import { PartialType } from '@nestjs/mapped-types';
          export class CreateMachineDowntimeDto {
            @IsString() @IsNotEmpty() machinename: string;
@IsString() @IsNotEmpty() reason: string;
@IsDateString() starttime: Date;
@IsDateString() @IsOptional() endtime: Date;
@IsInt() @Min(1) workorderid: number;
          }
          export class UpdateMachineDowntimeDto extends PartialType(CreateMachineDowntimeDto) {}
