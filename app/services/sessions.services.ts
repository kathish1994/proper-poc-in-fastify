import { LoginBodyParams } from "../types/session.controller";
import { UserInstance } from "../types/user";
import { getConfirmedUserByEmail } from "./user.services";
import { SessionError } from "../exceptions";
import bcrypt from "bcrypt";
import { sign as jwtSignin, verify as jwtVerify } from "jsonwebtoken";

async function signin(attrs: LoginBodyParams) {
  const currentUser = await getConfirmedUserByEmail(attrs.username);
  validatePassword(currentUser, attrs.password);
  return await markSignin(currentUser, attrs);
}

function validatePassword(currentUser: UserInstance, password: string) {
  const isPasswordSame = bcrypt.compareSync(
    password,
    currentUser.encrypted_password
  );

  if (!isPasswordSame) {
    throw new SessionError("session.invalid_user_name_and_password");
  }
}

async function markSignin(user: UserInstance, attrs: LoginBodyParams) {
  const currentDate = new Date();
  const { JWT_SECRET_KEY = "" } = process.env;
  const time = new Date();
  const { id, email, first_name, last_name } = user;
  const token = jwtSignin({ id, email, first_name, last_name }, JWT_SECRET_KEY);
  const updateAttributes = {
    access_token: token,
    is_currently_logged_in: true,
    current_sign_in_at: currentDate,
  };
  return await user.update(updateAttributes);
}

export { signin };
