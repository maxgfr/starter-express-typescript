import { IndexService } from '..';

describe('IndexService', () => {
  it('should return an ok status', () => {
    const service = new IndexService();

    expect(service.get()).toEqual({ status: 'available' });
  });
});
