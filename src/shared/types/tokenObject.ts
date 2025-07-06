/*import type { Permission } from './permissions.ts';*/

import type { AnyObject } from 'antd/es/_util/type';

export interface TokenObject {
  authorities: AnyObject[];
  client_id: string;
  display_name: string;
  email: string;
  exp: number;
  first_name: string;
  jti: string;
  last_name: string;
  middle_name: string | null;
  scope: string[];
  tenant_id: number;
  user_id: number;
  user_name: string;
  user_type: string;
}
