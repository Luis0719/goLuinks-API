const services = ['auth', 'users', 'roles', 'links'];

module.exports = () => {
  const buildServicePlugin = (service) => ({
    plugin: require(`../services/${service}`),
    routes: {
      prefix: `/api`,
    },
  });

  return services.map(buildServicePlugin);
};
