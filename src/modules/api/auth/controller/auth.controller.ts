import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiAuthLoginRequest, ApiAuthLoginResponse } from '../dto/auth-login.dto';
import { ApiUserRegisterRequest as ApiAuthRegisterRequest } from '../dto/auth-register.dto';
import { AuthService } from '../service/auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() loginRequest: ApiAuthLoginRequest): Promise<ApiAuthLoginResponse> {
    return await this.authService.login(loginRequest);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/register')
  async register(@Body() registerRequest: ApiAuthRegisterRequest): Promise<void> {
    await this.authService.register(registerRequest);
  }
}
