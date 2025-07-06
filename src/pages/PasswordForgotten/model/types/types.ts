export interface IUsernameError {
  type: 'username' | 'common';
  message: string;
  validateStatus?: 'error' | 'warning';
  lockBtn?: boolean;
}

export interface ITenantError {
  type: 'tenant' | 'common';
  message: string;
  validateStatus?: 'error' | 'warning';
  lockBtn?: boolean;
  redirectUsername?: boolean;
  redirectError?: IUsernameError;
}

export interface ITenant {
  id: string | number;
  name: string;
}

export type IUsernameSuccess = ITenant[];

export interface IUsernameError {
  type: 'username' | 'common';
  message: string;
  validateStatus?: 'error' | 'warning';
  lockBtn?: boolean;
}
