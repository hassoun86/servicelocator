import DependencyValue from './interfaces';

class ServiceLocator {
  private dependencyMap: DependencyValue;
  private dependencyCache: DependencyValue;
  constructor() {
    this.dependencyMap = {};
    this.dependencyCache = {};
  }

  /**
   * @Method Returns {Void}
   * @param dependencyName
   * @param constructor
   */
  public register(dependencyName: string, constructor: (locator: ServiceLocator) => any): void {
    if (typeof constructor !== 'function') {
      throw new Error(dependencyName + ': Dependency constructor is not a function');
    }

    if (!dependencyName) {
      throw new Error('Invalid dependency name provided');
    }

    this.dependencyMap[dependencyName] = constructor;
  }

  /**
   * @Method Returns {Function}
   * @param dependencyName {String}
   */
  public get(dependencyName: string): (constructor?: () => any) => any {
    if (this.dependencyMap[dependencyName] === undefined) {
      throw new Error(dependencyName + ': Attempting to retrieve unknown dependency');
    }

    if (typeof this.dependencyMap[dependencyName] !== 'function') {
      throw new Error(dependencyName + ': Dependency constructor is not a function');
    }

    if (this.dependencyCache[dependencyName] === undefined) {
      const dependencyConstructor = this.dependencyMap[dependencyName];
      const dependency = dependencyConstructor(this);

      if (dependency) {
        this.dependencyCache[dependencyName] = dependency;
      }
    }

    return this.dependencyCache[dependencyName];
  }

  /**
   * @Method Returns {DependencyValue}
   * Get all dependencies
   */
  public getAll(): DependencyValue {
    const dependencies = Object.keys(this.dependencyMap);

    for (const key in dependencies) {
      if (this.dependencyMap.hasOwnProperty(key)) {
        this.get(dependencies[key]);
      }
    }

    return this.dependencyCache;
  }

  /**
   * @Method Returns {Void}
   * Clear all dependencies
   */
  public clear(): void {
    this.dependencyCache = {};
    this.dependencyMap = {};
  }
}

export default new ServiceLocator();
