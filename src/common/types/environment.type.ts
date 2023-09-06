import { Environment } from '../enums';

export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SWAGGER_CONTACT_NAME: string;
            // rome-ignore lint/suspicious/noExplicitAny: <explanation>
            PORT: any;
            NODE_ENV: Environment;
            SWAGGER_NAME: string;
            HTTP_TIMEOUT: string;
            SWAGGER_DESCRIPTION: string;
            SWAGGER_VERSION: string;
            SWAGGER_CONTACT_EMAIL: string;
            SWAGGER_CONTACT_URL: string;
            SWAGGER_URL: string;
            GLOBAL_PREFIX: string;
        }
    }
}
