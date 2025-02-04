import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookingResolver } from './booking.resolver';
import { BookingService } from './booking.service';

@Module({
  providers: [BookingResolver, BookingService, PrismaService],
})
export class BookingModule {}
