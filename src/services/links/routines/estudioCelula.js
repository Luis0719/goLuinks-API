const cheerio = require('cheerio');
const got = require('got');

const TARGET_URL = 'https://castillodelreybrisas.com/celulas';

module.exports = async (params, reply) => {
  const rawResponse = await got(TARGET_URL);
  const $ = cheerio.load(rawResponse.body);

  const estudioDownloadComponent = $('#ultimo_estudio .btn-download');

  return reply.redirect(estudioDownloadComponent.attr('href'));
}