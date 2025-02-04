import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Role, Sex } from '@prisma/client';
import { Booking } from 'src/booking/entities/booking.entity';
import { Event } from 'src/event/entities/event.entity';

registerEnumType(Sex, {
  name: 'Sex',
});

registerEnumType(Role, {
  name: 'Role',
});

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field(() => Sex)
  sex: Sex;

  @Field(() => Role)
  role: Role;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  bio?: string;

  @Field(() => [Event])
  events: Event[];

  @Field(() => [Booking])
  bookings: Booking[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
