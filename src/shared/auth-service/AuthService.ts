import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import LocalStorageService from '../utils/localStorageService/localStorageService.ts';
import type { TokenObject } from '../types/tokenObject.ts';
import { getAuthRoute } from '../api/auth-token/tokenApi.ts';

/*import type { AnyObject } from 'antd/es/_util/type';*/

/*interface IData {
  access_token: string;
  jti: string;
  refresh_token: string;
  scope: 'read write';
  token_type: 'bearer';
}*/

/*interface IAuthResponse {
  config: AnyObject;
  data: IData;
  headers: AnyObject;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}

interface IAuthService {
  getCurrentUser: () => TokenObject | null;
  login: (
    login: string,
    password: string,
    tenantId: number,
  ) => Promise<IAuthResponse>;
}*/

const AuthService = {
  login(
    login: string,
    password: string,
    tenantId: string | number | null | undefined,
  ) {
    LocalStorageService.setTenant(tenantId);

    const authData = new URLSearchParams({
      username: login,
      password,
      tenant_id: tenantId as string,
      grant_type: 'password',
    }).toString();

    return axios.post(
      getAuthRoute(),
      authData,
      /* `username=${login}&password=${password}&tenant_id=${tenantId}&grant_type=password`,*/
      {
        auth: {
          username: 'web',
          password: 'R@d7vJD6uR',
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  },
  /*  getTenants(email: string) {
    return axios.get(tenantsApi(email), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },*/
  getCurrentUser() {
    const token = LocalStorageService.getAccessToken();
    if (token) return jwtDecode<TokenObject>(token);
    return null;
  },
  refreshToken() {
    axios
      .post(
        getAuthRoute(),
        `grant_type=refresh_token&refresh_token=${LocalStorageService.getRefreshToken()}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            GrandType: 'refresh_token',
          },
          auth: { username: 'client', password: 'secret' },
        },
      )
      .then((res) => {
        LocalStorageService.setToken(res?.data);
      })
      .catch(() => {
        LocalStorageService.setObject('isAuth', false);
      });
  },
};

export default AuthService;
