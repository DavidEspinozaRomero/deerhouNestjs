import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authRepository.createUser(authCredentialsDto)
  }
}
