
import * as fs from 'fs';
import * as path from 'path';

import Application from './application';

export async function start (port, services, repositories) {
  try {

    const application = new Application();
    await application.init(services, repositories);
    application.run(port);
  } catch (e) {
    process.exit(0);
  }
}
