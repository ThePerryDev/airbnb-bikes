import { UsersProps } from "../types";
import api from "./api";

class UsersService {
  async get(): Promise<UsersProps[]> {
    const { data } = await api.get("/user");
    return data;
  }

  async post(props: {
    alias: string;
    mail: string;
    phone: string;
  }): Promise<any> {
    const { data } = await api.post("/user", props);
    return data;
  }

  async put(props: {
    id: number;
    alias: string;
    mail: string;
    phone: string;
    token: string;
  }): Promise<any> {
    const { data } = await api.put("/user", props);
    return data;
  }

  async listById(id: string) {
    const { data } = await api.get(`/user/${id}`);
    return data;
  }
}

const service = new UsersService();
export default service;
