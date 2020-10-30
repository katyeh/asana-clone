const router = require('express').Router();

const routes = ['api/users', 'api/session', 'api/projects', 'api/tasks'];

for (let route of routes) {
  router.use(`/${route}`, require(`./${route}`));
}

module.exports = router;
