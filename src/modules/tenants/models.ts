export interface ResponseTenantModel {
  id: string;
  name: string;
  code: string;
  domain: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateTenantModel {
  name: string;
  code: string;
  domain: string;
}
