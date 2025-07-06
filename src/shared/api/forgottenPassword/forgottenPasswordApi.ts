import { baseUrl } from '../../utils/buildRootUrl/buildRootUrl.ts';
import buildUrl from '../../utils/buildUrl/buildUrl.ts';

export const forgottenPasswordApi = (email: string, tenant: string) =>
  buildUrl({
    url: `${baseUrl}/gateway/v1/users/forgot-password`,
    searchParams: { login: email, tenantId: tenant },
  });
