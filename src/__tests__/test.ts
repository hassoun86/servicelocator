import serviceLocator from '../index';
jest.mock('../index');

class Service {}

let service: Service;

beforeEach(() => {
  service = new Service();
});

afterEach(() => {
  serviceLocator.clear();
});

it('Should successfully register a dependency', () => {
  spyOn(serviceLocator, 'register');
  serviceLocator.register('service', () => {
    return service;
  });

  expect(serviceLocator.register).toHaveBeenCalledTimes(1);
});

it('Should successfully get a dependency', () => {
  spyOn(serviceLocator, 'get').and.returnValue(service);
  serviceLocator.register('service', () => {
    return service;
  });

  serviceLocator.get('service');

  expect(serviceLocator.get).toHaveBeenCalledTimes(1);
  expect(serviceLocator.get).toHaveBeenCalledWith('service');
});

it('Should successfully get all dependencies', () => {
  spyOn(serviceLocator, 'getAll');
  serviceLocator.register('service', () => {
    return service;
  });

  serviceLocator.getAll();
  expect(serviceLocator.getAll).toHaveBeenCalledTimes(1);
});

it('Should successfully clear all dependencies', () => {
    spyOn(serviceLocator, 'clear');
    serviceLocator.register('service', () => {
      return service;
    });
  
    serviceLocator.clear();
    expect(serviceLocator.clear).toHaveBeenCalledTimes(1);
  });
