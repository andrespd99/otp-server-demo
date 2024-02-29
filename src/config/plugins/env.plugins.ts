import 'dotenv/config';
import * as _env from 'env-var';


export const env = {
    PORT: _env.get('PORT').required().asPortNumber(),
    MAILER_SERVICE: _env.get('MAILER_SERVICE').required().asString(),
    MAILER_EMAIL: _env.get('MAILER_EMAIL').required().asEmailString(),
    MAILER_SECRET_KEY: _env.get('MAILER_SECRET_KEY').required().asString(),
    PROD: _env.get('PROD').required().asBool(),
}