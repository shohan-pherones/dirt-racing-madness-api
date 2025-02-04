import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { SignInInput } from './dto/sign-in.input';
import { SignUpInput } from './dto/sign-up.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpInput: SignUpInput) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: signUpInput.email },
    });
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(signUpInput.password, 10);
    const user = await this.prisma.user.create({
      data: { ...signUpInput, password: hashedPassword },
    });

    const token = this.jwtService.sign({ userId: user.id, role: user.role });

    return { user, token };
  }

  async signIn(signInInput: SignInInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: signInInput.email },
    });
    if (!user || !(await bcrypt.compare(signInInput.password, user.password))) {
      throw new BadRequestException('Invalid email or password');
    }

    const token = this.jwtService.sign({ userId: user.id, role: user.role });

    return { user, token };
  }
}
