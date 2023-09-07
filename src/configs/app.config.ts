import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
    port: process.env.PORT,
    logLevel: process.env.LOG_LEVEL,
    nodeEnv: process.env.NODE_ENV,
    axiosTimeout: process.env.AXIOS_TIMEOUT,
    axiosMaxRedirects: process.env.AXIOS_MAX_REDIRECTS,
    axiosBaseURL: process.env.AXIOS_BASE_URL,
}));
