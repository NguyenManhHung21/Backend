import { ForbiddenException, Injectable } from '@nestjs/common';
import { User, Note } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDTO } from './dto';
import * as argon2 from 'argon2';
import { MESSAGES } from '@nestjs/core/constants';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({}) // this is a Decorator and 'Dependency Injection'
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async register(authDTO: AuthDTO) {
    try {
      //generate password to hashedPassword
      const hashedPassword = await argon2.hash(authDTO.password);

      //insert data to database
      const user = await this.prismaService.user.create({
        data: {
          email: authDTO.email,
          hashedPassword,
          firstName: '',
          lastName: '',
        },

        //only select id, email, createdAt
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });
      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Error in credentials');
      }
    }
  }

  async login(authDTO: AuthDTO) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email: authDTO.email,
        },
      });

      const passMatched = await argon2.verify(
        user.hashedPassword,
        authDTO.password,
      );
      if (!passMatched) {
        throw new ForbiddenException('Email or password incorrect!');
      }
      delete user.hashedPassword;
      return {
        acess_token: await this.convertObjectToJwtString(user.id, user.email),
      };
    } catch (error) {
      throw new ForbiddenException('Email or password incorrect!');
    }
  }

  async convertObjectToJwtString(
    userId: number,
    email: string,
  ): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };
    return await this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: this.configService.get('JWT_SERECT'),
    });
  }
}
