import { BuildOptions, Model } from "sequelize";

export interface BookAttributes {
  id: number;
  book_name: string;
  book_author: string;
  description: string;
}

export interface BookInstance extends Model<BookAttributes>, BookAttributes {
  isAdmin(): boolean;
  fullName(): string;
  isCustomerUser(): boolean;
}

export type BookStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): BookInstance;
};
