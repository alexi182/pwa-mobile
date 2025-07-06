import buildUrl from '../../utils/buildUrl/buildUrl.ts';
import { securityBaseUrl } from '../../utils/buildRootUrl/buildRootUrl.ts';

export const passwordRequirements = () =>
  buildUrl({
    url: [securityBaseUrl, 'security', 'passwords', 'requirements'].join('/'),
  });
