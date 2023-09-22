import { BikeProps } from "../types";
import api from "./api";

class BikeService {
  async get(): Promise<BikeProps[]> {
    const { data } = await api.get("/bikes");
    return data;
  }
  
  async post(props: {
    idUser: string;
    idCategory: string;
    idBrand: string;
    color: string;
    size: string;
    material: string;
    gender: string;
    speedkit: string;
    rim: string;
    suspension: string;
    description: string;
    hourlyvalue: string;
    dailyvalue: string;
    latitude: string;
    longitude: string;
  }): Promise<any> {
    const { data } = await api.post("/bike", props);
    return data;
  }
}

const service = new BikeService();
export default service;
