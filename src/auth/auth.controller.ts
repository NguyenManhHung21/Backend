import { Body, Controller, Post, RawBodyRequest, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
  //auth service is automatically created when initializing the controller
  constructor(private authService: AuthService) {}
  @Post('register') //register a  new user
  register(@Body() authDTO: AuthDTO) {
    return this.authService.register(authDTO);
  }

  // Post: ...auth/login
  @Post('login')
  login(@Body() authDTO: AuthDTO) {
    return this.authService.login(authDTO);
  }
}
