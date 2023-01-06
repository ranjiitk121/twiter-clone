import {start, TypeormService} from '@my/backend-core';
import { User } from './modules/user/entities/user.entity';

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

async function init() {
  start(defaultConfig.port);
  await new TypeormService().connect([User]);
}
init();