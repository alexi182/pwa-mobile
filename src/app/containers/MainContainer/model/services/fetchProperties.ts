import type { AnyObject } from 'antd/es/_util/type';
import { clientUnAuthorized } from '../../../../../shared/auth-service/AuthServiceInt.ts';
import { getProperties } from '../../../../../shared/api/properties/propertiesApi.ts';

export const fetchProperties = async (
  tenantId: number,
): Promise<AnyObject> /*<Application>*/ => {
  try {
    const data: { data: AnyObject[] } = await clientUnAuthorized.get(
      getProperties(tenantId),
    );
    return data?.data;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return Promise.reject('Не удалось загрузить данные');
  }
};
