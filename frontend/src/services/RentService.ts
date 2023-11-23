import { RentsProps } from "../types";
import api from "./api";

class RentService {
  async get(): Promise<RentsProps[]> {
    const { data } = await api.get("/rents");
    return data;
  }

  async post(props: {
    idBike: number;
    idClient: number;
    idOwner: number;
    rentalDate: Date;
    returnDate: Date;
    ownerValuation: number;
    clientValuation: number;
  }): Promise<any> {
    const { data } = await api.post("/rent", props);
    return data;
  }

  async listByClient(iduser:string){
    const { data } = await api.get(`/rent/client/${iduser}`);
    return data;
  }

  async listByOwner(iduser:string){
    const { data } = await api.get(`/rent/owner/${iduser}`);
    return data;
  }
}


const service = new RentService();
export default service;
