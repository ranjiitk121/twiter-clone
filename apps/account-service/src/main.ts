import {start, TypeormService} from '@my/backend-core';
import { User } from './modules/user/entities/user.entity';
import { UserService } from './modules/user/services/user.service';


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
  getControllers();
  await start(defaultConfig.port, [UserService], []);
  await new TypeormService().connect([User]);
}

function getControllers() {
  require('./modules/user/controllers')
}

init();