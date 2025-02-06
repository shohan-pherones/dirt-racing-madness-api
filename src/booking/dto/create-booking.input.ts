import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateBookingInput {
  @Field()
  @IsString()
  eventId: string;
}
