import '../index';
import { Container, interfaces } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import request from 'supertest';
import { IndexService } from '../../services';
import { getName } from '../../utils';
import { MockIndexService } from './mocks';
import type { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';

describe('IndexController', () => {
  let server: InversifyExpressServer;
  let container: interfaces.Container;

  beforeEach((done) => {
    container = new Container();
    container
      .bind<IndexService>(getName(IndexService))
      .to(MockIndexService)
      .inSingletonScope();
    server = new InversifyExpressServer(container);
    server.setConfig((srv) => {
      // add body parser
      srv.use(
        bodyParser.urlencoded({
          extended: true,
        }),
      );
      srv.use(bodyParser.json());
    });
    server.setErrorConfig((app) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      app.use(
        (err: Error, _req: Request, res: Response, _next: NextFunction) => {
          res.status(500).json({ error: err.message });
        },
      );
    });
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
