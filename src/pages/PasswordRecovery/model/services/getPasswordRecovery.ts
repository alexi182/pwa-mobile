import { clientUnAuthorized } from '../../../../shared/auth-service/AuthServiceInt.ts';
import { passwordRequirements } from '../../../../shared/api/passwordRequirements/passwordRequirements.ts';
import type { IPasswordRequirements } from '../types/types.ts';

export const fetchPasswordRequirements =
  async (): Promise<IPasswordRequirements> => {
    try {
      const data: {
        data: IPasswordRequirements;
      } = await clientUnAuthorized.get(passwordRequirements());
      return data?.data;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return Promise.reject('Не удалось загрузить данные');
    }
  };
