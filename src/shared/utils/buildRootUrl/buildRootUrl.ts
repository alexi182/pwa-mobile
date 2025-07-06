/*import store from '../../../app/store/store.ts';*/

/*export const buildRootUrl = () => {
  let url;
  if (process.env.API_URL) {
    url = store.config.REACT_APP_BASE_URL;
  } else if (process.env.REACT_APP_PROD_URL) {
    url = store.config.REACT_APP_PROD_URL;
  }
  return url;
};*/

/*export const baseUrlParse2 = buildRootUrl();*/

export const baseUrlParse = 'https://sdn101.iflex.ru';

export const baseUrlHttpTenant = baseUrlParse.replace('https', 'http');
console.log(baseUrlHttpTenant);

export const baseUrl = `${baseUrlParse}/api`;

export const securityBaseUrl = `${baseUrlParse}/auth`;

export const standBaseUrl = baseUrl;
