module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return h.view('home');
    },
    config: {
      tags: ['api', 'links'],
      description: 'Home page',
    },
  },
];
