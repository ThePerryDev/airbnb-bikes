import { BikeProps } from "../types";
import api from "./api";

class BikeService {
  async get(): Promise<BikeProps[]> {
    const { data } = await api.get("/bikes");
    return data;
  }

  async post(props: {
    idUser: number;
    idCategory: number;
    idBrand: number;
    color: string;
    size: number;
    material: string;
    gender: string;
    speedkit: string;
    rim: string;
    suspension: string;
    description: string;
    hourlyvalue: number;
    dailyvalue: number;
    latitude: number;
    longitude: number;
  }): Promise<any> {
    const { data } = await api.post("/bike", props);
    return data;
  }
}

const service = new BikeService();
export default service;
