import { Op } from "sequelize";

import { UserInstance, UserStatic } from "../../types/user";

export function isEmailUnique(
  this: UserInstance,
  value: string,
  next: (err?: string) => void
) {
  if (value) {
    const model = this.constructor as UserStatic;
    model
      .findOne({ where: { email: { [Op.iLike]: value } } })
      .then((result: unknown) => {
        if (result) {
          return next("email id should be unique");
        }
        return next();
      })
      .catch(() => next());
  } else {
    next();
  }
}

export function isValidPassword(
  this: UserInstance,
  password: string,
  next: (err?: string) => void
) {
  if (password) {
    if (password !== this.password_confirmation) {
      return next("Password confirmation doesn't match Password");
    }
  }
  next();
}
