const combineRouters = require('koa-combine-routers');

const authRouter = require('./v1/auth/authRouter');
const applicationRouter = require('./application/applicationRouter');
const eventRouter = require('./v1/events/eventsRouter');
const googleEventRounter = require('./v1/googleEvents/googleEventRounter');

const router = combineRouters(
    applicationRouter,
    authRouter,
    eventRouter,
    googleEventRounter,
);

module.exports = router;
