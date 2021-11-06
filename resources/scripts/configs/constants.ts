export const IS_DEV = process.env.APP_ENV === 'local';
export const APP_URL = IS_DEV ? 'http://localhost:8000' : process.env.APP_URL;

export const URLS = {
  app: APP_URL,
  api: `${APP_URL}/api`
};
