import { Injectable, NestMiddleware } from '@nestjs/common';
import { DEVELOPMENT_DELAY_MS } from '../constants';

@Injectable()
export class DelayMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    setTimeout(() => {
      next();
    }, DEVELOPMENT_DELAY_MS);
  }
}
