// auth.controller.ts

import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
 //  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    return this.authService.login(req.body.username,req.body.password, req.body.email);
  }

  @Post('register')
  //  @UseGuards(AuthGuard('local'))
   async register(@Body() createUserDto: CreateUserDto) {
     return this.authService.register(createUserDto);
   }



}
