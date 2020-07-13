
const { configureGqlx, createServices, createService } = require('gqlx-apollo-express-server');
const services = require('./graphql-services');
const createApi = require('./createApi');

const [service1] = services;
const gqlxServer = configureGqlx({
  port: 3000,
  host: 'http://localhost:3000',
  services: [createService(service1.name, service1.gqlx, service1.data, service1.api)],
  createApi
});

module.exports = { gqlxServer }
