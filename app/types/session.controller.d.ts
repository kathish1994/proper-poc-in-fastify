export interface JwtTokenUserAttributes {
  id: number;
  email: string;
  last_name: string;
  first_name: string;
}

export interface LoginBodyParams {
  username: string;
  password: string;
}
