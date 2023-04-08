import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { JWT_COOKIE_NAME } from '../common/constants';
import { JwtAuthGuard, Public } from './auth.jwt-auth.guard';
import { AuthService } from './auth.service';
import { LoginJwtDto } from './dto/login-jwt.dto';
import { LoginRequestDto } from './dto/login-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @Public()
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() loginDto: LoginRequestDto,
  ) {
    const jwt = await this.authService.loginJwt(loginDto);
    res.cookie(JWT_COOKIE_NAME, jwt, { httpOnly: true, sameSite: 'strict' });
    res.status(200);
    return new LoginJwtDto({ accessToken: jwt });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
    return { message: 'Logout successful' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('current-user')
  async getCurrentUser(@Req() req) {
    const user = await this.authService.getUserById(req.user.email);
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }
}
