require('dotenv').config();
const globalConfig = {
    port: process.env.DEV_PORT || 3000
};

module.exports = globalConfig;