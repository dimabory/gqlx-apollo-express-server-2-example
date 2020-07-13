const express = require('express');
const router = express.Router();
const { createService } = require('gqlx-apollo-express-server')
const { gqlxServer } = require('../gqlxServer');
const services = require('../graphql-services');

router.get('/', function (req, res, next) { res.json({ message: 'hello, world' }) });

router.post('/upload', function (req, res, next) {
  res.json(true)
});

router.get('/update-service-1', function (req, res, next) {
  const [service1] = services;
  gqlxServer.update(createService(service1.name, `
    type UpdatedUser {
      name: String
    }

    type Query {
      users: [UpdatedUser] { get('/users/') }
    }
    `,
    service1.data,
    service1.api));

  res.json('service-1 successfully updated');
})

router.get('/insert-service-2', function (req, res, next) {
  const [, service2, ..._] = services;
  gqlxServer.insert(createService(service2.name, service2.gqlx, service2.data, service2.api));
  res.json('service-2 successfully inserted');
})

module.exports = router;
