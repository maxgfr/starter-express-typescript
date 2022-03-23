import 'reflect-metadata';
import './controllers';

import bodyParser from 'body-parser';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import type { NextFunction, Request, Response } from "express";

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

server.setErrorConfig((app) => {
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    res.status(500).json({ error: err.message });
  });
});

const app = server.build();

export default app;