import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingResolver } from './booking.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [BookingResolver, BookingService, PrismaService],
})
export class BookingModule {}
