import { User } from './user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthRepository } from './auth.repository';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authRepository: AuthRepository) {
    super({
      secretOrKey: 'qwerty123.',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user: User = await this.authRepository.api.findOne({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException("");
    }
    return user
  }
}
