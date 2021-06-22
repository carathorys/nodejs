export const ActionMetadata = Symbol('ActionMetadata');

export type ActionParameter = {
  path: string;
  method: 'get' | 'post' | 'patch' | 'delete';
};

export const Action = (params?: ActionParameter) => {
  return <T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) => {
    target[ActionMetadata] = target[ActionMetadata] || new Map();
    target[ActionMetadata].set(propertyKey, params);
  };
};
