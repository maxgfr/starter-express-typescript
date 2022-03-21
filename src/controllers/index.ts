import { inject } from 'inversify';
import type { interfaces } from 'inversify-express-utils';
import { controller, httpGet } from 'inversify-express-utils';

import { IndexService } from '../services';
import { getName } from '../utils';

@controller('/')
export class IndexController implements interfaces.Controller {
  constructor(
    @inject(getName(IndexService))
    private readonly service: IndexService,
  ) {}

  @httpGet('/')
  index(): Record<string, string> {
    return this.service.get();
  }
}
