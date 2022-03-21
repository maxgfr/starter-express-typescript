import 'reflect-metadata';
import './controllers';

import bodyParser from 'body-parser';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';

import { IndexService } from './services';
import { getName } from './utils';

const container = new Container();

container.bind<IndexService>(getName(IndexService)).to(IndexService);

const server = new InversifyExpressServer(container);

server.setConfig((srv) => {
  srv.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
  srv.use(bodyParser.json());
});

const app = server.build();

export default app;