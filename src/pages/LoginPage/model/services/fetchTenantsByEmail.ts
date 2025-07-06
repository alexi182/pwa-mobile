import { getTenantsByEmail } from '../../../../shared/api/tenants/tenantsApi.ts';
import type { ITenantEmailPromise } from '../../../../app/containers/MainContainer/model/types/tenants.ts';
import { clientUnAuthorized } from '../../../../shared/auth-service/AuthServiceInt.ts';

export const fetchTenantsByEmail = async (
  email: string,
): ITenantEmailPromise => {
  return new Promise((resolve, reject) => {
    clientUnAuthorized
      .get(getTenantsByEmail(email))
      .then(({ data }) => {
        if (data && data?.length > 0) {
          resolve(data);
        } else {
          reject({
            type: 'username',
            message: 'Пользователь с таким email не найден',
            validateStatus: 'error',
            lockBtn: true,
          });
        }
      })
      .catch((e) => {
        reject({
          type: 'username',
          message:
            e.response?.data?.error || 'Пользователь с таким email не найден',
          validateStatus: 'error',
          lockBtn: true,
        });
      });
  });
};
