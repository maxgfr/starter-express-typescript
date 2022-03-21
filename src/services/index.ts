import { injectable } from 'inversify';

import { name } from '../utils';

@injectable()
@name('IndexService')
export class IndexService {
  get(): Record<string, string> {
    return { status: 'available' };
  }
}
