import { Field, InputType } from '@nestjs/graphql';
import { Sex } from '@prisma/client';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class SignUpInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(6)
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @Field(() => Sex)
  sex: Sex;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  address?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  bio?: string;
}
