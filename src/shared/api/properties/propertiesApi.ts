import buildUrl from '../../utils/buildUrl/buildUrl.ts';
import { baseUrl } from '../../utils/buildRootUrl/buildRootUrl.ts';

export const getProperties = (tenantId: number) =>
  buildUrl({
    url: `${baseUrl}/gateway/v1/configurations/public`,
    searchParams: { tenantId },
  });
