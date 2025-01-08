import { Controller } from '@nestjs/common';
import { Type } from '@nestjs/common/interfaces';
import 'reflect-metadata';

export function createControllerWithPrefix<T extends object>(
  controller: Type<T>,
  prefix: string,
): Type<T> {
  const originalPath = Reflect.getMetadata('path', controller) as
    | string
    | undefined;

  if (!originalPath) {
    throw new Error(
      'The provided controller does not have a @Controller decorator.',
    );
  }

  const DynamicController = class extends controller {};

  Controller(`${prefix}/${originalPath}`)(DynamicController);

  return DynamicController;
}
