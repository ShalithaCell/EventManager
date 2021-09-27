const combineRouters = require('koa-combine-routers');

const authRouter = require('./v1/auth/authRouter');
const applicationRouter = require('./application/applicationRouter');

const router = combineRouters(
    applicationRouter,
    authRouter,
);

module.exports = router;
