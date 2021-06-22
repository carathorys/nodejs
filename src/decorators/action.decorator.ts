import { ParameterMetadata, ParameterMetadataKey } from './parameter.decorator';
import { RequestHandler } from 'express';

export const ActionMetadata = Symbol('ActionMetadata');

export type ActionParameter = {
  path: string;
  method: 'get' | 'post' | 'patch' | 'delete';
};

export const Action = (params?: ActionParameter) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    let originalMethod = descriptor.value!;
    const fn: RequestHandler = function (req, res, next) {
      const parameters: ParameterMetadata[] = Reflect.getOwnMetadata(
        ParameterMetadataKey,
        target,
        propertyKey,
      );
      for (let parameter of parameters) {
        if (
          parameter.parameterIndex >= arguments.length ||
          arguments[parameter.parameterIndex] === undefined
        ) {
          throw new Error('Missing argument!');
        }
      }
      return originalMethod.apply(this, arguments);
    };
    descriptor.value = fn;

    target[ActionMetadata] = target[ActionMetadata] || new Map();
    target[ActionMetadata].set(propertyKey, params);
  };
};
