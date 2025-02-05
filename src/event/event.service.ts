import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventInput } from './dto/create-event.input';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEventInput: CreateEventInput, userId: string) {
    if (new Date(createEventInput.dateTime) <= new Date()) {
      throw new BadRequestException('Event date must be in the future');
    }
    return await this.prisma.event.create({
      data: { ...createEventInput, userId },
    });
  }

  async findAll() {
    return await this.prisma.event.findMany({
      include: {
        bookings: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.event.findUnique({
      where: { id },
      include: {
        user: true,
        bookings: {
          include: {
            user: true,
          },
        },
      },
    });
  }
}
