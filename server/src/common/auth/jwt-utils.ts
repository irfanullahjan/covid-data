import { Request } from 'express';
import { decode } from 'jsonwebtoken';
import { RequestContext } from 'nestjs-request-context';
import { JwtPayload } from '../../auth/auth.types';

export function getUserFromRequest(request?: Request): JwtPayload {
  const req = request ?? RequestContext.currentContext?.req;
  if (req) {
    const jwt = req.cookies.jwt ?? req.headers.authorization?.substring(7);
    if (jwt) {
      const decoded: unknown = decode(jwt);
      if (decoded && typeof decoded !== 'string') {
        return decoded as JwtPayload;
      }
    }
  }
}
