import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventResolver } from './event.resolver';
import { EventService } from './event.service';

@Module({
  providers: [EventResolver, EventService, PrismaService],
})
export class EventModule {}
