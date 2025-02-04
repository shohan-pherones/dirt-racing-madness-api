import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

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
