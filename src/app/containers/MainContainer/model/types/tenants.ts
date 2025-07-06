export type ITenantEmailPromise = Promise<
  ITenantEmailRequestError | ITenantsListItem[]
>;

interface ITenantEmailRequestError {
  type: 'username' | 'common';
  validateStatus?: 'error' | 'warning';
  message: string;
  lockBtn?: boolean;
}

interface ITenantsListItem {
  id: number | string | null;
  name: string;
}
