import { Controller } from '@nestjs/common';
import { Type } from '@nestjs/common/interfaces';

export function createControllerWithPrefix<T extends object>(
  controller: Type<T>,
  prefix: string,
): Type<T> {
  // Obtener la ruta original del controlador
  const originalPath = Reflect.getMetadata('path', controller) as
    | string
    | undefined;

  if (!originalPath) {
    throw new Error(
      'The provided controller does not have a @Controller decorator.',
    );
  }

  // Crear una nueva clase que extiende el controlador original
  const DynamicController = class extends controller {};

  // Aplicar el decorador @Controller con la nueva ruta
  Controller(`${prefix}/${originalPath}`)(DynamicController);

  return DynamicController;
}
