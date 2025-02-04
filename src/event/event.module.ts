import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventResolver } from './event.resolver';
import { EventService } from './event.service';

@Module({
  imports: [AuthModule],
  providers: [EventResolver, EventService, PrismaService],
})
export class EventModule {}
