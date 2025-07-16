import api from "../axios-instance";
import { AdminUserSchema, LoginResponseSchema } from "./admin.schema";

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const res = await api.post("/admin/login", { username, password });
  return LoginResponseSchema.parse(res.data.data);
};

export const getUser = async () => {
  const res = await api.get("/admin/users");
  return AdminUserSchema.parse(res.data.data);
};
