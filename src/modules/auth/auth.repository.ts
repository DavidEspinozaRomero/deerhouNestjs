import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Auth } from './auth.entity';

@Injectable()
export class AuthRepository {
  constructor(private dataSource:DataSource){}

  api = this.dataSource.getRepository(Auth)
}
