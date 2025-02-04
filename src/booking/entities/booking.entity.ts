import { Field, ObjectType } from '@nestjs/graphql';
import { Event } from 'src/event/entities/event.entity';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Booking {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field()
  eventId: string;

  @Field(() => User)
  user: User;

  @Field(() => Event)
  event: Event;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
