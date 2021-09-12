'use strict';
const { testServer } = require('./testCommon');

describe('#server', function () {
  let server;

  before(async function () {
    server = await testServer.getTestServer();
  });

  describe('GET /', function () {
    it('redirects to admin page', async function () {
      const res = await server.inject({
        method: 'get',
        url: '/',
      });

      expect(res.statusCode).to.equal(302);
    });
  });
});
