import { useEffect } from 'react';
import LocalStorageService from '../../../../shared/utils/localStorageService/localStorageService.ts';
import AppRoutes from '../../../router/AppRoutes.tsx';
import store from '../../../store/store.ts';
import { fetchProperties } from '../model/services/fetchProperties.ts';
import { observer } from 'mobx-react-lite';

export const MainContainer = observer(() => {
  const tenantId = LocalStorageService.getTenantId();
  const tenant = tenantId ? Number(tenantId) : 1;

  useEffect(() => {
    store.setPropertiesLoading(true);
    if (tenant) {
      fetchProperties(tenant)
        .then((data) => {
          store.setProperties(data);
        })
        .finally(() => {
          store.setPropertiesLoading(false);
        });
    }
    /* isAuthenticated && dispatch(fetchApplicationIcons({ dicType: 'app_subject' }));*/
  }, [tenant]);

  return <AppRoutes />;
});
