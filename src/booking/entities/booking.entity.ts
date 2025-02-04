import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/auth/entities/user.entity';
import { Event } from 'src/event/entities/event.entity';

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
