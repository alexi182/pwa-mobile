import buildUrl from '../../utils/buildUrl/buildUrl.ts';
import { securityBaseUrl } from '../../utils/buildRootUrl/buildRootUrl.ts';

export const getTenantsByEmail = (email: string) =>
  buildUrl({
    url: `${securityBaseUrl}/security/tenants`,
    searchParams: { login: email },
  });
