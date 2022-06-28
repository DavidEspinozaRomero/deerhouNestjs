import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthRepository {
  constructor(private dataSource: DataSource) {}

  api = this.dataSource.getRepository(User);

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const user = this.api.create({ username, password });
    try {
      await this.api.save(user);
    } catch (error) {
      console.log(error);
      if (error.code === '23505') { //duplicate username
        throw new ConflictException("User already exist");
      } else {
        throw new InternalServerErrorException();
        
      }
      
    }
  }
}
