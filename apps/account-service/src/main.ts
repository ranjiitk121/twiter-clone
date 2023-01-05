import { start } from '@my/backend-core';

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
console.log('good boy');