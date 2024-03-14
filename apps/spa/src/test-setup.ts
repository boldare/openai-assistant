// @ts-expect-error: Jest global setup
globalThis.ngJest = {
  testEnvironmentOptions: {
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true,
  },
};

global.setImmediate = jest.useRealTimers as unknown as typeof setImmediate;
// @ts-expect-error: Jest global setup
window.setImmediate = window.setTimeout
import 'jest-preset-angular/setup-jest';
