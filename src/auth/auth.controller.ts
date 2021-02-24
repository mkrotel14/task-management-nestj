import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentrialDTO } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) credentials: AuthCredentrialDTO): Promise<void> {
    return this.authService.signUp(credentials);
  }

  @Post('/signin')
  signIn(
    @Body() credentials: AuthCredentrialDTO,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(credentials);
  }
}
