const IS_DEV = process.env.APP_ENV === 'local';
const APP_URL = IS_DEV ? 'http://localhost:8000' : process.env.APP_URL;

const URLS = {
  app: APP_URL,
  api: `${APP_URL}/api`
};

export {
  IS_DEV,
  URLS
};
