const services = ['auth', 'users', 'roles', 'links'];

module.exports = () => {
  const buildServicePlugin = (service) => ({
    plugin: require(`../services/${service}`),
  });

  return services.map(buildServicePlugin);
};
