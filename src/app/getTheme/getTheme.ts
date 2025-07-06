import { clientUnAuthorized } from '../../shared/auth-service/AuthServiceInt.ts';

export const getTheme = (config: string) => {
  return new Promise((resolve, reject) => {
    clientUnAuthorized
      .get(config)
      .then((data) => {
        if (data) {
          resolve(data?.data);
        }
      })
      .catch(() => {
        reject('Отсутствует дизайн');
      });
  });
};
