'use strict';
const { expect } = require('chai');
const sinon = require('sinon');

const methods = require('../../../src/services/links/methods');
const { db, utils, testServer } = require('../../testCommon');
const factories = require('../../testCommon/factories');

const { initDatabase } = db;

describe('#links routes', function () {
  let serverInject;
  let authorizedHeaders;

  before(async function () {
    await initDatabase();

    let user = await db.factories.User.create({});
    serverInject = utils.buildServerInjecter(await testServer.getTestServer());
    authorizedHeaders = utils.buildAuthorizedJwtHeaders(user.id);
  });

  after(async function () {
    await initDatabase();
  });

  describe('POST /links/create', function () {
    let route;

    before(function () {
      route = {
        url: `/api/links/create`,
        method: 'POST',
      };
    });

    afterEach(async function() {
      await initDatabase();
    });

    describe('request attributes', function() {
      it('should return 400 if name is not provided', async function() {
        const payload = {
          url: 'some+test+url.com',
        };
        const res = await serverInject(route, authorizedHeaders, payload);

        expect(res.statusCode).to.be.equal(400);
      });

      it('should return 400 if url is not provided', async function() {
        const payload = {
          name: 'my-link',
        };
        const res = await serverInject(route, authorizedHeaders, payload);

        expect(res.statusCode).to.be.equal(400);
      });

      it('should pass with all required attrs provided', async function() {
        const payload = {
          name: 'my-link',
          url: 'some+test+url.com',
        };
        const storeLinkStub = sinon.stub(methods, 'store').callsFake(async () => ({link: {}}));
        const res = await serverInject(route, authorizedHeaders, payload);

        expect(res.statusCode).to.be.equal(201);
        storeLinkStub.restore();
      });
    });

    describe('logic', function() {
      it('should store new link happy path', async function() {
        const payload = {
          name: 'my-link',
          url: 'myurl.com',
        }

        const res = await serverInject(route, authorizedHeaders, payload);
        expect(res.statusCode).to.equal(201);
        expect(res.result.name).to.equal(payload.name);
        expect(res.result.url).to.equal(payload.url);
      });

      it('should not duplicate names', async function() {
        const payload = {
          name: 'my-link',
          url: 'myurl.com',
        }

        await serverInject(route, authorizedHeaders, payload);
        const res = await serverInject(route, authorizedHeaders, payload);
        expect(res.statusCode).to.equal(400);
        expect(res.result.message).to.equal('A link with this name already exists');
      });
    });
  });

  describe('GET /links', function () {
    let route;
    let testLink;

    before(async function () {
      route = {
        url: `/links`,
        method: 'GET',
      };

      // Create test links
      testLink = await factories.Link.create();
    });

    describe('logic', function() {
      it('should get list of links', async function() {
        const res = await serverInject(route);
        expect(res.statusCode).to.equal(200);

        const resPayload = JSON.parse(res.payload);
        expect(resPayload.total).to.equal(1);
        expect(resPayload.items[0].name).to.equal(testLink.name);
      });
    });
  });

  describe('GET /', function () {
    let route;
    let testLink;

    before(async function () {
      await initDatabase();

      route = (name) => ({
        url: `/${name}`,
        method: 'GET',
      });

      // Create test links
      testLink = await factories.Link.create();
    });

    describe('logic', function() {
      it('should fail if name is not found', async function() {
        const res = await serverInject(route('wrong-name'), {});
        expect(res.statusCode).to.equal(404);
      });

      it('should redirect if name exists', async function() {
        const res = await serverInject(route(testLink.name), {});
        expect(res.statusCode).to.equal(302);
        expect(res.headers.location).to.equal(testLink.url);
      });
    });
  });
});
