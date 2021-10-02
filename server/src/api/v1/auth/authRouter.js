const Router = require('koa-router');
const StatusCodes = require('http-status-codes');
const { version } = require('../../../config');
const linkedInCredentials = require('../../../../credentials.linkedin');
const { secureTokenService, InMemoryDb } = require('../../../services');
const { Response } = require("../../../types");

// Prefix all routes with: /auth
const router = new Router({
    prefix : `${version.v1}/auth`,
});

// Routes will go here

// user sign in method
router.get('/', async (ctx, next) =>
{
    let obj;

    const secureCode = secureTokenService.randomValueHex(20);

    await InMemoryDb.save('token', secureCode);

    const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${linkedInCredentials.client_id}&redirect_uri=${linkedInCredentials.redirect_url}&state=${secureCode}&scope=${linkedInCredentials.scopes}`;

    ctx.redirect(url);

    next().then();
});

router.get('/callback', async (ctx, next) =>
{
    const { state, code } = ctx.request.query;

    const token = await InMemoryDb.get('token');

    if (state === token)
    {
        const url = `http://localhost:3000/dashboard/events?code=${state}`;

        const authDict = await InMemoryDb.get('authCodes');

        let newAuthDict;

        if (authDict)
        {
            newAuthDict = [
                ...authDict,
                {
                    state,
                    code,
                },
            ];
        }
        else
        {
            newAuthDict = [
                {
                    state,
                    code,
                },
            ];
        }

        await InMemoryDb.save('authCodes', newAuthDict);

        ctx.redirect(url);
    }
    else
    {
        ctx.redirect('http://localhost:3000/404');
    }
    next().then();
});

module.exports = router;
