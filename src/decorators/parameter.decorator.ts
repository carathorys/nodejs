import 'reflect-metadata';

export const ParameterMetadataKey = Symbol('ParameterMetadata');

export type ParameterArguments = {
  from: 'header' | 'query' | 'path' | 'payload';
};

export type ParameterMetadata = ParameterArguments & {
  parameterIndex: number;
};

export const Parameter =
  (args: ParameterArguments = { from: 'query' }) =>
  (target: any, propertyKey: string, parameterIndex: number) => {
    let params: ParameterMetadata[] =
      Reflect.getOwnMetadata(ParameterMetadataKey, target, propertyKey) || [];
    params.push({ ...args, parameterIndex: parameterIndex });

    Reflect.defineMetadata(ParameterMetadataKey, params, target, propertyKey);
  };
