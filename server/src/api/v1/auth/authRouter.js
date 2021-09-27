const Router = require('koa-router');
const StatusCodes = require('http-status-codes');
const { version } = require('../../../config');

// Prefix all routes with: /auth
const router = new Router({
    prefix : `${version.v1}/auth`,
});

// Routes will go here

// user sign in method
router.post('/', async (ctx, next) =>
{
    // const request = Object.setPrototypeOf(ctx.request.body, CredentialType.prototype);
    // // Check if any of the data field not empty
    //
    // if (!request.isValid())
    // {
    //     ctx.response.status = StatusCodes.BAD_REQUEST;
    //     ctx.body = 'Please enter username and password';
    //     next().then();
    //
    //     return;
    // }

    // await authenticate.passwordSignInAsync(ctx, request);
    next().then();
});

module.exports = router;
