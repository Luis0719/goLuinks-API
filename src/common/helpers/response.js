const { promisify } = require('util');
const jiggler = require('jiggler');

const overrideSuccessStatusCode = (handler, newStatusCode) =>
  async (req, reply) => {
    const result = await handler(req, reply);

    return reply.response(result).code(newStatusCode);
  }

const representAs = (rep, data, options) => {
  if (typeof jiggler.as[rep] !== 'function') {
    throw new Error(`Could not find '${rep}' representation`);
  }

  return promisify(jiggler.as[rep])(data, options);
};

const representAsPaginated = async (rep, data, options) => {
  let items;
  let totalItems;

  // Always return data with 'rows' and 'total' keys
  if (Array.isArray(data)) {
    items = data;
    totalItems = data.length;
  } else {
    if (!('rows' in data) || !('count' in data)) {
      throw new Error(
        'Could not paginate object without "rows" or "total" keys'
      );
    }

    items = data.rows;
    totalItems = data.count;
  }

  const jigglerizedItems = await representAs(rep, items, options);
  return {
    items: jigglerizedItems,
    total: totalItems,
  };
};

const noContent = async (res) => {
  return res.response().code(204);
};

module.exports = {
  noContent,
  overrideSuccessStatusCode,
  representAs,
  representAsPaginated,
};
