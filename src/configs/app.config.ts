import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
    port: process.env.PORT,
    logLevel: process.env.LOG_LEVEL,
    nodeEnv: process.env.NODE_ENV,
}));
