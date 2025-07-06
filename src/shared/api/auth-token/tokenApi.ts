import { baseUrlParse } from '../../utils/buildRootUrl/buildRootUrl.ts';

export const getAuthRoute = () =>
  [`${baseUrlParse}`, 'auth', 'security', 'oauth', 'token'].join('/');
