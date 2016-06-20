import wagner from 'wagner-core';

import { init as initConfig } from './config';
import { init as initModels } from './models';
import { init as initApi } from './api';
import { startServer } from './server';

initConfig(wagner);
initModels(wagner);
initApi(wagner);

startServer(wagner);
