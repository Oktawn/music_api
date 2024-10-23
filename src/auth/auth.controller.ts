import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateDto, UserLoginDto, UserUpdateDto } from './users.dto';
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

  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile(@Req() req) {
    return this.authService.getProfile(req.userId);
  }

  @Put('profile')
  @UseGuards(AuthGuard)
  async updateProfile(@Req() req, @Body() body: UserUpdateDto) {
    const update: UserUpdateDto = {
      ...body,
      userId: req.userId
    }
    return this.authService.updateProfile(update);
  }

}
