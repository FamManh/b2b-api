import apiCore from "./apiCore";
import { EUserRole } from "./users";

export interface IReqLogin {
  email: string;
  password: string;
  is_buyer?: boolean;
}

export interface IResLogin {
  deleted: boolean;
  buyer: boolean;
  admin: boolean;
  enabled: boolean;
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  company: string;
  phone: string;
  customer_group_id: number;
  customer_list_price: number;
  date_created: number;
  date_modified: number;
  notes: string;
  group_name: string;
  address_ids: number;
  addresses: string;
  budget_id: number;
  remaining_budget: number;
  group_label_id: number;
  group_label_name: string;
  is_admin: boolean;
  is_buyer: boolean;
  is_enabled: boolean;
  account_role: EUserRole;
  is_deleted: boolean;
  can_assign_quote: boolean;
  access_token: string;
}

export const doLogin: API.DigiApi<IResLogin, IReqLogin> = async (arg) => {
  const { domain, payload, options } = arg;
  const res = await apiCore.post(
    `${domain}/sf/login`,
    {
      ...payload,
      is_buyer: true,
    },
    options
  );

  return res;
};
