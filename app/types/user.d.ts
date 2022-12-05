import { Model, BuildOptions } from "sequelize";
import { BookInstance } from "./book";

export interface UserAttributes {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  encrypted_password: string;
  token: string;
  password_confirmation: string;
}

export type UserCreateAttributes = Pick<
  UserAttributes,
  "first_name" | "last_name" | "email"
>;

export interface UserInstance
  extends Model<UserAttributes, UserCreateAttributes>,
    UserAttributes {
  book?: BookInstance;

  isAdmin(): boolean;
  fullName(): string;
  isCustomerUser(): boolean;
}

export type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserInstance;
};
