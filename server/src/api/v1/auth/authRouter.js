const Router = require('koa-router');
const StatusCodes = require('http-status-codes');
const { version } = require('../../../config');
const linkedInCredentials = require('../../../../credentials.linkedin');
const { secureTokenService, InMemoryDb, communicationService } = require('../../../services');
const { Response } = require("../../../types");

// Prefix all routes with: /auth
const router = new Router({
    prefix : `${version.v1}/auth`,
});

// Routes will go here

// user sign in method
router.get('/', async (ctx, next) =>
{
    // generate random secured code for use state
    // state use for prevent CSRF
    const secureCode = secureTokenService.randomValueHex(20);

    // save code to local db
    await InMemoryDb.save('token', secureCode);

    const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${linkedInCredentials.client_id}&redirect_uri=${linkedInCredentials.redirect_url}&state=${secureCode}&scope=${linkedInCredentials.scopes}`;

    ctx.redirect(url);

    next().then();
});

router.get('/callback', async (ctx, next) =>
{
    // get state code and token code from the linkedin 0Auth2 server
    const { state, code } = ctx.request.query;

    // get the state code from local db
    const token = await InMemoryDb.get('token');

    // check that server return code and local db code is same
    if (state === token)
    {
        // redirect URL
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

        // save auth codes
        await InMemoryDb.save('authCodes', newAuthDict);

        // get the access token
        communicationService.GetLinkedInAccessToken(code, state);

        ctx.redirect(url);
    }
    else
    {
        ctx.redirect('http://localhost:3000/404');
    }
    next().then();
});

module.exports = router;
