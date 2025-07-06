export interface TenantsLoginError {
  type: 'password' | 'common';
  error: string;
  redirectUsername?: boolean;
}

export interface TenantsLoginData {
  id?: number | string | null;
  username: string;
  password: string;
}

export type TenantsAndPasswordFinishPromise = Promise<TenantsLoginError | any>;
