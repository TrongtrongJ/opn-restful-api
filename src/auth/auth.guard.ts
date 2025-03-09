import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith('Bearer ') ||
      !authHeader.startsWith('bearer ')
    ) {
      throw new UnauthorizedException('Invalid authorization header');
    }

    const token = authHeader.split(' ')[1];
    const user = this.authService.validateToken(token);

    if (!user) {
      throw new UnauthorizedException('Invalid authtoken');
    }

    request.user = user;
    return true;
  }
}
