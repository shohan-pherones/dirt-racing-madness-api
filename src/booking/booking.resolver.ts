import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { ROLES } from 'src/common/constants/roles.constant';
import { Roles } from 'src/common/decorators/roles.decorator';
import { BookingService } from './booking.service';
import { CreateBookingInput } from './dto/create-booking.input';
import { DeleteBookingInput } from './dto/delete-booking.input';
import { Booking } from './entities/booking.entity';

@Resolver(() => Booking)
export class BookingResolver {
  constructor(private readonly bookingService: BookingService) {}

  @Mutation(() => Booking)
  @UseGuards(AuthGuard)
  @Roles(ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER)
  createBooking(
    @Args('createBookingInput') createBookingInput: CreateBookingInput,
    @Context('req') req: any,
  ) {
    return this.bookingService.create(
      createBookingInput,
      req.user.userId as string,
    );
  }

  @Mutation(() => Booking)
  @UseGuards(AuthGuard)
  @Roles(ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER)
  deleteBooking(
    @Args('deleteBookingInput') deleteBookingInput: DeleteBookingInput,
    @Context('req') req: any,
  ) {
    return this.bookingService.delete(
      deleteBookingInput,
      req.user.userId as string,
    );
  }
}
