import '../index';
import { Container, interfaces } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import request from 'supertest';
import { IndexService } from '../../services';
import { getName } from '../../utils';
import { MockIndexService } from './mocks/index.test';

describe('IndexController', () => {
  let server: InversifyExpressServer;
  let container: interfaces.Container;

  beforeEach((done) => {
    container = new Container();
    container.bind<IndexService>(getName(IndexService)).to(MockIndexService);
    server = new InversifyExpressServer(container);
    done();
  });

  it('should render the home endpoint', async () => {
    const res = await request(server.build()).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ status: 'mocked' });
  });

  it('should test mocked service home endpoint', async () => {
    const service = container.get<IndexService>(getName(IndexService));
    expect(service.get()).toEqual({ status: 'mocked' });
  });
});
