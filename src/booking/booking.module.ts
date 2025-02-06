import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookingResolver } from './booking.resolver';
import { BookingService } from './booking.service';

@Module({
  imports: [AuthModule],
  providers: [BookingResolver, BookingService, PrismaService],
})
export class BookingModule {}
