const Router = require('koa-router');
const { eventService } = require('../../../services');

// Prefix all routes with: /category
const router = new Router({
    prefix : '/api/event',
});

// Routes will go here
// category create method
router.post('/create', async (ctx, next) =>
{
    const params = ctx.request.body;

    const result = await eventService.create(params);

    console.log(result);

    if (!result)
    {
        console.log(result);
    }
    else if (result === true)
    {
        console.log(result);
    }
    else
    {
        console.log(result);
    }
});
module.exports = router;
