import buildUrl from '../../utils/buildUrl/buildUrl.ts';
import { baseUrl } from '../../utils/buildRootUrl/buildRootUrl.ts';

export const resetPasswordApi = ({
  token,
  password,
}: {
  token: string;
  password: string;
}) =>
  buildUrl({
    url: `${baseUrl}/gateway/v1/users/reset-forgotten-password`,
    searchParams: { token, password },
  });
