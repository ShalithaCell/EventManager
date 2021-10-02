const Koa = require('koa');
const koaBody = require('koa-body');
const KoaStatic = require('koa-static');
const cors = require('@koa/cors');
const router = require('./api');
const { dbContext, exceptionService, InMemoryDb } = require('./services');

// init the database connection.
dbContext();
InMemoryDb.init();

const app = new Koa();

app
    .use(koaBody({ formidable : {
        uploadDir      : `${__dirname}/../public/materials`, // directory where files will be uploaded
        keepExtensions : true, // keep file extension on upload
    },
    multipart  : true,
    urlencoded : true }))
    .use(exceptionService.errorHandler) // register generic error handler middleware
    .use(exceptionService.jsonErrorHandler) // register json error handler middleware
    .use(cors()) // allowed CORS
    .use(router()) // Use the Router on the sub routes
    .use(KoaStatic('public')); // server statics

// Bootstrap the server

const server = app.listen(process.env.PORT || 5000, async () =>
{
    console.log('server stared with port 5000');

    console.log();
    console.log();
    console.log('=======================Server StartUp===========================');
    console.log('For more info :');
    console.log('\x1b[33m\x1b[4m%s\x1b[0m', 'http://localhost:5000/api/');
    console.log('=====================================================================');
    console.log();
});

module.exports = server;
