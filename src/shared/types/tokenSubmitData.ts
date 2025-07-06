export type ITenantsAndPasswordFinishPromise = Promise<
  ITenantsLoginError | any
>;

export interface ITenantsLoginData {
  id?: number | string | null;
  username: string;
  password: string;
}

interface ITenantsLoginError {
  type: 'password' | 'common';
  error: string;
  redirectUsername?: boolean;
}
