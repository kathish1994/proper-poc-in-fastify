import { UserInstance } from "../../app/types/user";

class ExistingUserLoginError extends Error {
  existingUser: UserInstance;
  constructor(user: UserInstance) {
    const message = `"${user.fullName()}", logged in already. You can wait or logout the existing user.`;
    super(message);
    this.existingUser = user;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ExistingUserLoginError;
