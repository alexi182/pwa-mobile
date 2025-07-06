const LocalStorageService = {
  setToken(tokenObj: { access_token: string; refresh_token: string }) {
    localStorage.setItem('access_token', tokenObj.access_token);
    localStorage.setItem('refresh_token', tokenObj.refresh_token);
  },
  getAccessToken() {
    return localStorage.getItem('access_token');
  },
  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  },
  clearToken() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
  setTenant(tenant: string | number | null | undefined) {
    if (typeof tenant === 'string') {
      localStorage.setItem('tenantId', tenant);
    }
  },
  getTenantId() {
    return localStorage.getItem('tenantId');
  },
  setObject(key: string, value: string | boolean) {
    if (typeof value === 'string') {
      localStorage.setItem(key, value);
    }
  },
};

export default LocalStorageService;
