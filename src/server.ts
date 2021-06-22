import 'reflect-metadata';

import { Injector } from '@furystack/inject';

import express, { NextFunction, RequestHandler, Response } from 'express';

import { SchedulerController } from './controllers';
import { Instance } from './decorators';
console.clear();
const app = express();
const decoratorStore = Instance;

var services = new Injector();

app.use(async (req, res, next) => {
  let requestScope = services.createChild({
    owner: req,
    parent: services,
  });

  (req as any).scope = requestScope;

  requestScope.setExplicitInstance(req);
  requestScope.setExplicitInstance(res);
  await next();
  await requestScope.dispose();
});

const storedData = Instance.getMetadata();
storedData.forEach((metadata, meta) => {
  if (!metadata) {
    return;
  }
  let path = '/' + (metadata.basePath ?? meta.toLowerCase().replace('controller', ''));

  metadata.actions.forEach((actionMeta, actionName) => {
    const finalPath = `${path}/${actionMeta.path}`;
    const handle: RequestHandler = async (req, res, next): Promise<void> => {
      try {
        var controllerInstance = (req as any)['scope'].getInstance(metadata.__type);
        if (typeof controllerInstance[actionName] === 'function') {
          var resultData = await controllerInstance[actionName]
            .bind(controllerInstance)
            .call(controllerInstance, req, res, next);
          console.log(resultData);
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

app.get('/', (req, res, next) => {
  var scheduler = services.getInstance(SchedulerController);
  console.log(req);
  res.send('Well done!');
});

// app.get('/list/:id', (req, res) => {
//   var scheduler = services.getInstance(SchedulerController);
//   scheduler.show(req, res);
// });

app.listen(3000, () => {
  console.log('The application is listening on port 3000!');
});
