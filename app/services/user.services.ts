import { UserInstance } from "../types/user";
import { SessionError } from "../exceptions";
import { User } from "../models";

function getConfirmedUserByEmail(email: string): Promise<UserInstance> {
  return User.findOne({ where: { email } }).then(
    (user: UserInstance | null) => {
      if (user) {
        return user;
      }
      throw new SessionError("session.invalid_user_name_and_password");
    }
  );
}



export { getConfirmedUserByEmail };
