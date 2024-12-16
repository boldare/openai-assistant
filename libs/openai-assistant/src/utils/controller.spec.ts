import { Controller, Get } from '@nestjs/common';
import { createControllerWithPrefix } from './controllers';
import 'reflect-metadata';

// Controlador original para pruebas
@Controller('test')
class TestController {
  @Get()
  getTest(): string {
    return 'Original Controller';
  }
}

describe('createControllerWithPrefix', () => {
  it('should create a new controller with the prefixed route', () => {
    // Crear el controlador con prefijo
    const PrefixedController = createControllerWithPrefix(
      TestController,
      'api',
    );

    // Obtener la ruta del controlador prefijado
    const originalPath = Reflect.getMetadata('path', TestController);
    const prefixedPath = Reflect.getMetadata('path', PrefixedController);

    // Verificar que la ruta original no ha cambiado
    expect(originalPath).toBe('test');

    // Verificar que la ruta del controlador prefijado es correcta
    expect(prefixedPath).toBe('api/test');
  });

  it('should throw an error if the controller does not have @Controller decorator', () => {
    // Clase sin decorador @Controller
    class InvalidController {}

    // Verificar que la función lanza un error
    expect(() => createControllerWithPrefix(InvalidController, 'api')).toThrow(
      'The provided controller does not have a @Controller decorator.',
    );
  });
});
