import { Controller, Get } from '@nestjs/common';
import { createControllerWithPrefix } from './controllers';
import 'reflect-metadata';

@Controller('test')
class TestController {
  @Get()
  getTest(): string {
    return 'Original Controller';
  }
}

describe('createControllerWithPrefix', () => {
  it('should create a new controller with the prefixed route', () => {
    const PrefixedController = createControllerWithPrefix(
      TestController,
      'api',
    );

    const originalPath = Reflect.getMetadata('path', TestController);
    const prefixedPath = Reflect.getMetadata('path', PrefixedController);

    expect(originalPath).toBe('test');

    expect(prefixedPath).toBe('api/test');
  });

  it('should throw an error if the controller does not have @Controller decorator', () => {
    class InvalidController {}

    expect(() => createControllerWithPrefix(InvalidController, 'api')).toThrow(
      'The provided controller does not have a @Controller decorator.',
    );
  });
});
