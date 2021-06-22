import { ActionMetadata, ActionParameter } from './action.decorator';
import { Injectable } from '@furystack/inject';

import { Instance } from './decorator-store';

export type ControllerParameter = {
  basePath?: string;
};

export const ControllerMetadata = Symbol('ControllerMetadata');

export const Controller =
  (parameters?: ControllerParameter) =>
  <T extends { new (...args: any[]): {} }>(Base: T) => {
    @Injectable({ lifetime: 'scoped' })
    class ControllerClass extends Base {
    }

    Instance.addControllerMetadata(Base.name, { ...parameters }, ControllerClass, Base);
    const actions = Base.prototype[ActionMetadata] as Map<string, ActionParameter>;
    actions?.forEach((value, key) => {
      Instance.appendActionMetadata(Base.name, key, value);
    });
    return ControllerClass;
  };
