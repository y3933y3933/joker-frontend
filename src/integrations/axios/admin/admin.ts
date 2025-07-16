import api from "../axios-instance";
import { AdminUserSchema, LoginResponseSchema } from "./admin.schema";

export const Login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const res = await api.post("/admin/login", { username, password });
  return LoginResponseSchema.parse(res.data);
};

export const GetUser = async () => {
  const res = await api.get("/admin/users");
  return AdminUserSchema.parse(res.data);
};
