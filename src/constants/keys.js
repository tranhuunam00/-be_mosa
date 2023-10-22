module.exports.SECRET_KEY = process.env.SECRET_KEY || '123';
module.exports.SESSION_SECRET_KEY = process.env.SESSION_SECRET_KEY || '123';
module.exports.SECRET_KEY_REFRESH = process.env.SECRET_KEY_REFRESH || '123';

// Redis Config
module.exports.REDIS_CONFIG = {
  host: process.env.REDIS_HOST,
  port: +process.env.REDIS_PORT || 6379,
  db: +process.env.REDIS_DB || 0,
  password: process.env.REDIS_PASSWORD || '',
};
