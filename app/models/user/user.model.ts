import { Sequelize } from "sequelize";
import { USER_ROLE } from "../../config/constants";
import db from "../../config/database";
import { attributes, modelOptions } from "./user.model.attributes";
import { UserStatic } from "../../types/user";

function UserModelFactory(sequelize: Sequelize): UserStatic {
  return sequelize.define("User", attributes, modelOptions) as UserStatic;
}

const User = UserModelFactory(db);

User.prototype.fullName = function (): string {
  return `${this.first_name} ${this.last_name}`;
};

User.prototype.isAdmin = function (): boolean {
  return this.role === USER_ROLE.admin;
};

User.prototype.isCustomerUser = function (): boolean {
  return this.role === USER_ROLE.user;
};

export default User;
