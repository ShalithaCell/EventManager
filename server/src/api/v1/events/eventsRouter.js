const Router = require('koa-router');
const StatusCodes = require('http-status-codes');
const { eventService, communicationService } = require('../../../services');
const { Response } = require("../../../types");
const { version } = require('../../../config');

// Prefix all routes with: /user
const router = new Router({
    prefix : `${version.v1}/events`,
});

// Routes will go here
router.get('/', async (ctx, next) =>
{
    const response = new Response();

    const result = await eventService.find();

    if (!result)
    {
        ctx.response.status = StatusCodes.FORBIDDEN;

        response.success = false;
        response.message = "Cannot find event data";
        response.data = {
            message : '',
        };

        ctx.body = response;
        next().then();

        return;
    }

    response.success = true;
    response.message = `event data retrieved successfully`;
    response.data = {
        events : result,
    };
    ctx.response.status = StatusCodes.OK;
    ctx.body = response;

    next().then();
});

router.post('/', async (ctx, next) =>
{
    const response = new Response();

    const { code, post } = ctx.request.body;

    await communicationService.PostLinkedInPost(code, post);

    response.success = true;
    response.message = `data share successfully.`;
    ctx.response.status = StatusCodes.OK;
    ctx.body = response;

    next().then();
});

module.exports = router;
