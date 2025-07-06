import { clientUnAuthorized } from '../../shared/auth-service/AuthServiceInt.ts';

export const getConfig = async () => {
  const timestamp = new Date().getTime();
  const rootUrl = window.location.origin;
  const response = await clientUnAuthorized.get(
    `${rootUrl}/config.json?v=${timestamp}`,
  );
  return response?.data;
};
