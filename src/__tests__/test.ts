import { ServiceLocator } from '../index';
test('My Greeter', () => {
  expect(ServiceLocator()).toBe('Hello');
});