import { injectable } from 'inversify';

@injectable()
export class MockIndexService {
  get(): Record<string, string> {
    return { status: 'mocked' };
  }
}
