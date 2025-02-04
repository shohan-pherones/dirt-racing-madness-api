import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateEventInput } from './dto/create-event.input';
import { Event } from './entities/event.entity';
import { EventService } from './event.service';

@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Mutation(() => Event)
  createEvent(@Args('createEventInput') createEventInput: CreateEventInput) {
    return this.eventService.create(createEventInput);
  }

  @Query(() => [Event], { name: 'events' })
  findAll() {
    return this.eventService.findAll();
  }

  @Query(() => Event, { name: 'event' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.eventService.findOne(id);
  }
}
