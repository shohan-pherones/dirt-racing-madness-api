import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookingInput } from './dto/create-booking.input';
import { DeleteBookingInput } from './dto/delete-booking.input';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookingInput: CreateBookingInput, userId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: createBookingInput.eventId },
      include: {
        bookings: { include: { user: true } },
      },
    });

    if (!event) {
      throw new BadRequestException('Event not found');
    }

    if (event.status !== 'UPCOMING') {
      throw new BadRequestException('Event is no longer upcoming');
    }

    const isUserRegistered = event.bookings.some(
      (booking) => booking.user.id === userId,
    );
    if (isUserRegistered) {
      throw new BadRequestException(
        'User is already registered for this event',
      );
    }

    const availableSeats = event.capacity - event.bookings.length;
    if (availableSeats <= 0) {
      throw new BadRequestException('No available seats for this event');
    }

    return await this.prisma.booking.create({
      data: { ...createBookingInput, userId },
    });
  }
  async delete(deleteBookingInput: DeleteBookingInput, userId: string) {
    const { eventId } = deleteBookingInput;

    const booking = await this.prisma.booking.findFirst({
      where: { eventId, userId },
      include: { event: true },
    });

    if (!booking) {
      throw new BadRequestException('Booking not found for this event');
    }

    if (booking.event.status !== 'UPCOMING') {
      throw new BadRequestException('Event is no longer upcoming');
    }

    return await this.prisma.booking.delete({
      where: { id: booking.id },
    });
  }
}
