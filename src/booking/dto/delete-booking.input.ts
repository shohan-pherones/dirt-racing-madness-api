import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class DeleteBookingInput {
  @Field()
  @IsString()
  eventId: string;
}
