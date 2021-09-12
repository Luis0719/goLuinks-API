/*
  IMPORTANT: 'links' must be the last one since it matches all routes
  GET /<something>. This way other more-specific routes can be registered.

  Service must equals the name of the directory at /src/services
  Provide an object if you need to add more options.
    - Using prefix: undefined resets the prefix
*/
const services = [
  'auth',
  'users',
  'roles',
  {
    name: 'links',
    prefix: undefined,
  }
];

const DEFAULT_PREFIX = '/api';

module.exports = () => {
  function getServiceData(service) {
    if (typeof service === 'string') {
      return {
        name: service,
        prefix: DEFAULT_PREFIX,
      }
    }

    return {
      name: service.name,
      prefix: service.prefix,
    }
  }

  function buildServicePlugin(service) {
    const {
      name,
      prefix,
    } = getServiceData(service);

    const servicePath = `../services/${name}`;

    return {
      plugin: require(servicePath),
      routes: {
        prefix: prefix,
      }
    }
  };

  return services.map(buildServicePlugin);
};
