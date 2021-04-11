const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const client = redis.createClient();
client.get = util.promisify(client.get);
const exec = mongoose.Query.prototype.exec;
client.flushall();

mongoose.Query.prototype.cache = function () {
  this.useCache = true;

  return this;
};

// TODO - currently it's not working when document is populated
mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) return exec.apply(this, arguments);

  const key = JSON.stringify({ ...this.getQuery(), collection: this.mongooseCollection.name });
  const cacheValue = await client.get(key);

  if (cacheValue) {
    const doc = JSON.parse(cacheValue);
    console.log('from cache...');

    return Array.isArray(doc) ? doc.map(d => new this.model(d)) : new this.model(doc);
  }

  const result = await exec.apply(this, arguments);

  client.set(key, JSON.stringify(result));
  return result;
};

module.exports = {
  clearCache() {
    client.flushall();
  },
};
