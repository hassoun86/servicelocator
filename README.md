# Service Locator

Service locator for typescript project to help with dependency injection

Installation

Use the package manager npm to install servicelocator

```bash
npm i servicelocator
```

#Usage
```ts
import serviceLocator from 'servicelocator'

serviceLocator.register('service', () => {
    return new service()
});
````

#Get a service
```ts
const service = serviceLocator.get('service')
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)