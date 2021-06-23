import 'reflect-metadata';

import { Injector } from '@furystack/inject';

import express, { RequestHandler } from 'express';

import { LoggerService } from './services/logger.service';
import { DecoratorDataStore } from './decorators';
console.log('-===============================================-');

import './controllers';

console.log('Application starting');
const app = express();

var services = new Injector();

app.use(async (req, res, next) => {
  let requestScope = services.createChild({
    owner: req,
    parent: services,
  });
  const log = requestScope.getInstance(LoggerService);
  log.Info('New incoming request');

  (req as any).scope = requestScope;

  requestScope.setExplicitInstance(req);
  requestScope.setExplicitInstance(res);
  await next();
  await requestScope.dispose();
});

const storedData = DecoratorDataStore.getMetadata();
storedData.forEach((metadata, meta) => {
  if (!metadata) {
    return;
  }
  let path = '/' + (metadata.basePath ?? meta.toLowerCase().replace('controller', ''));

  metadata.actions.forEach((actionMeta, actionName) => {
    const finalPath = `${path}/${
      actionMeta.path.endsWith('/')
        ? actionMeta.path.substring(0, actionMeta.path.length - 2)
        : actionMeta.path
    }`;
    const handle: RequestHandler = async (req, res, next): Promise<void> => {
      try {
        var controllerInstance = (req as any)['scope'].getInstance(metadata.__type);
        if (typeof controllerInstance[actionName] === 'function') {
          var resultData = await controllerInstance[actionName]
            .bind(controllerInstance)
            .call(controllerInstance, req, res, next);
          if (resultData) {
            res.send(resultData);
            return next();
          }
          return next();
        }
      } catch (error) {
        console.error(error);
        return next(error);
      }
    };
    console.log(`Setting up ${actionMeta.method} request for path '${finalPath}'`);
    switch (actionMeta.method) {
      case 'get':
        app.get(finalPath, handle);
        break;
      case 'post':
        app.post(finalPath, handle);
        break;
      case 'patch':
        app.patch(finalPath, handle);
        break;
      case 'delete':
        app.delete(finalPath, handle);
        break;
    }
  });
});

app.listen(3000, () => {
  console.log('The application is listening on port 3000!');
});
