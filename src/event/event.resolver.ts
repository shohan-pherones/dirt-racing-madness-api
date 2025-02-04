import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { ROLES } from 'src/common/constants/roles.constant';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateEventInput } from './dto/create-event.input';
import { Event } from './entities/event.entity';
import { EventService } from './event.service';

@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Mutation(() => Event)
  @UseGuards(AuthGuard)
  @Roles(ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER)
  createEvent(
    @Args('createEventInput') createEventInput: CreateEventInput,
    @Context('req') req: any,
  ) {
    return this.eventService.create(
      createEventInput,
      req.user.userId as string,
    );
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
