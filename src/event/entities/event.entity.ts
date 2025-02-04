import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { EventStatus } from '@prisma/client';

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
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
