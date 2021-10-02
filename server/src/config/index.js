const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    version : {
        v1 : '/api/v1',
    },
    connectionString : process.env.MONGO_CONNECTION,
    siteLogo         : process.env.SITE_LOGO,
    siteName         : process.env.SITE_NAME,
    siteUrl          : process.env.SITE_URL,
};
