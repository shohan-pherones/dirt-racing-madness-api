import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { EventStatus } from '@prisma/client';
import { Booking } from 'src/booking/entities/booking.entity';
import { User } from 'src/user/entities/user.entity';

registerEnumType(EventStatus, {
  name: 'EventStatus',
});

@ObjectType()
export class Event {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field()
  dateTime: Date;

  @Field()
  location: string;

  @Field(() => Int)
  capacity: number;

  @Field(() => EventStatus)
  status: EventStatus;

  @Field()
  userId: string;

  @Field(() => User)
  user: User;

  @Field(() => [Booking], { nullable: true })
  bookings?: Booking[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
