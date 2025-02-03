/* eslint-disable @typescript-eslint/no-unsafe-call */
import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsInt, IsDate } from 'class-validator';

@InputType()
export class CreateEventInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  description: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @Field()
  @IsDate()
  dateTime: Date;

  @Field()
  @IsString()
  location: string;

  @Field(() => Int)
  @IsInt()
  capacity: number;
}
