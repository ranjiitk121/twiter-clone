//TODO: move packages into package using and remove relative paths
const start = require('../../packages/backend-core/run-service');
console.log(start);
const defaultConfig = {
    environment: {
        isDev: true,
        isProd: false,
    },
    port: 4903,
    db: {
        database: 'learning_twitter-clone',
        pg: {
            password: 'root',
            port: 5432,
            host: 'localhost',
            user: 'postgres',
        },
        runMigrations: false,
    },
};

start(defaultConfig.port);