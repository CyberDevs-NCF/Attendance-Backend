import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Events } from './schemas/events.schemas';

@Injectable()
export class EventsService {
    constructor(@InjectModel(Events.name) private events: Model<Events>) {}

    /* Displaying all events */
    async find() {
    const result = await this.events.find().exec();

    if (!result || result.length === 0) {
      throw new NotFoundException('No event found');
    }
    return result;
  }

  /* Finding Specific Event */
  async findOne(id: string) {
    const event = await this.events.findById(id).exec();
    if (!event) 
        throw new NotFoundException('Event Specified Not Found');
    
    return event;
  }

  /* Adding Event */
  async create(createEventDto: CreateEventDto) {
    const newEvent = new this.events(createEventDto);
    return newEvent.save();
  }

  /* Modifying Event */
  async update(id: string, updateEventDto: UpdateEventDto) {
    const updatedEvent = await this.events
      .findByIdAndUpdate(id, updateEventDto, { new: true })
      .exec();

    if (!updatedEvent) 
        throw new NotFoundException('Event Not Found');

    return updatedEvent;
  }

  /* Removing Event */
  async delete(id: string) {
    const deletedEvent = await this.events.findByIdAndDelete(id).exec();
    if (!deletedEvent) 
        throw new NotFoundException('Event Not Found');

    return deletedEvent;
  }
}
