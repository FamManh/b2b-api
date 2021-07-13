export enum EUserRole {
  ANONYMOUS = 'ANONYMOUS',
  AOHQ = 'AOHQ',
  MOHQ = 'MOHQ',
  AOSG = 'AOSG',
  MOSG = 'MOSG',
}

export interface IFormalUser {
  first_name: string
  last_name: string
  phone: string
  is_default: boolean
}

export interface IUserAddress extends IFormalUser {
  address1: string
  state_or_province: string
  postal_code: string
  country: string
  country_code?: string
  city: string
}

export interface IAddress extends IUserAddress {
  address2: string | null
  address_type: string | null
  state: string | null
  street_1: string | null
  street_2: string | null
  zip: string | null
  address_id?: number
}

export interface ICountry {
  id: number
  country: string
  country_iso2: string
  country_iso3: string
}

export interface IStateProvince {
  id: number
  state: string
  state_abbreviation: string
  country_id: number
}
