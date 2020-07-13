const express = require('express');
const router = express.Router();

const users = new Map([
    [0, {name: 'Dima'}],
    [1, {name: 'Ivan'}]
])

router.get('/', function(req, res, next) {
  res.json([...users.values()]);
});

module.exports = router;
