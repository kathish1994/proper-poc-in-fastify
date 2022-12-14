import { headers, signInUserProfile } from "../shared-schema";

const loginRouterOpts = {
  schema: {
    description: "post user credentials",
    tags: ["sessions", "admin-role", "user-role"],
    headers: {
      type: "object",
      properties: {
        "accept-language": { type: "string" },
      },
    },
    body: {
      type: "object",
      required: ["username", "password", "language"],
      properties: {
        username: { type: "string" },
        password: { type: "string" },
        language: { type: "string" },
      },
    },
    response: {
      headers,
      200: {
        description: "Successfully logged in",
        type: "object",
        properties: {
          id: { type: "number" },
          role: { type: "string" },
          email: { type: "string" },
          last_name: { type: "string" },
          first_name: { type: "string" },
        },
      },
      401: {
        description: "Invalid username or password",
        type: "object",
        properties: {
          errors: { type: "array", items: { type: "string" } },
        },
      },
      403: {
        description:
          "Another user logged in already (you will get existing user information in the response)",
        type: "object",
        properties: {
          id: { type: "number" },
          role: { type: "string" },
          email: { type: "string" },
          last_name: { type: "string" },
          first_name: { type: "string" },
          organization_id: { type: "number" },
          current_sign_in_at: { type: "string" },
        },
      },
      500: {
        description: "Something went wrong",
        type: "object",
        properties: {
          errors: { type: "array", items: { type: "string" } },
        },
      },
    },
  },
};
export default loginRouterOpts;
