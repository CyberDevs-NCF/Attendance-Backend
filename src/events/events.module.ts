import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Events, EventSchema } from './schemas/events.schemas';

@Module({
    imports: [
        MongooseModule.forFeature([{name:Events.name,
            schema: EventSchema
        }])
    ],
    controllers: [EventsController],
    providers: [EventsService]
})
export class EventsModule {}
