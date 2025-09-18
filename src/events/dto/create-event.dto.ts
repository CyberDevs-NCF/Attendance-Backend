import { IsString, IsNotEmpty, IsDateString } from "@nestjs/class-validator";

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    event_name: string;
    
    @IsString()
    @IsNotEmpty()
    venue: string;

    @IsNotEmpty()
    @IsDateString()
    date_time: Date
}