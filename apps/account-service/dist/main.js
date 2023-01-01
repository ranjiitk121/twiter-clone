"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//TODO: move packages into package using and remove relative paths
const run_service_1 = __importDefault(require("../../../packages/backend-core/run-service"));
console.log(run_service_1.default);
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
(0, run_service_1.default)(defaultConfig.port);
//# sourceMappingURL=main.js.map