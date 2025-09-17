import { Controller, Param, Body, ValidationPipe, Get, Post, Patch, Delete } from '@nestjs/common';
import { EventsService } from './events.service';
import { IdParamDto } from './dto/id-param.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventsController {

    constructor(private readonly eventService: EventsService) { }
    
    /* Request Methods */

    //Getting All Events
    @Get()
    find() {
        return this.eventService.find()
    }
    //Getting Specific Event
    @Get(':id')
    findOne(@Param(ValidationPipe) params: IdParamDto) {
        return this.eventService.findOne(params.id)
    }
    //Adding Event
    @Post()
    create(@Body(ValidationPipe) createEventDto:CreateEventDto) {
        return this.eventService.create(createEventDto)
    }
    //Editing Event
    @Patch(':id')
    update(@Param(ValidationPipe) params: IdParamDto, @Body(ValidationPipe) updateEventDtoDto: UpdateEventDto) {
        return this.eventService.update(params.id, updateEventDtoDto)
    }
    //Removing Event
    @Delete(':id')
    delete(@Param(ValidationPipe) params: IdParamDto) {
        return this.eventService.delete(params.id)
    }
}
