"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
exports.default = {
    /**
     * Port the app should run on
     */
    port: parseInt(process.env.PORT) || 5050,
    /**
     * Used by Winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
    /**
     * API configs
     */
    api: {
        prefix: '/api',
    },
};
//# sourceMappingURL=index.js.map