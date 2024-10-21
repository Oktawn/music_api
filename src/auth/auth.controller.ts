import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateDto, UserLoginDto } from './users.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('signup')
  async signup(@Body() body: UserCreateDto) {
    return this.authService.signup(body);
  }

  @Post('login')
  async login(@Body() body: UserLoginDto) {
    return this.authService.login(body);
  }

  @Post('refresh')
  async refreshToken(@Body() body: { refreshToken: string }) {
    return this.authService.valRefreshToken(body.refreshToken);
  }


}
