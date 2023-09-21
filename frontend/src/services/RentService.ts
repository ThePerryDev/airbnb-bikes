import { RentsProps } from "../types";
import api from "./api";
import { Valuation } from "../types/index";

class RentService {
  async get(): Promise<RentsProps[]> {
    const { data } = await api.get("/rents");
    return data;
  }


async post(props: {
    idBike:number;
    idClient:number;
    idOwner:number;
    date:Date;
    ownerValuation: Valuation;
    clientValuation: Valuation;
}): Promise<any> {
    const { data } = await api.post("/rents", props);
    return data;
  }
}

const service = new RentService();
export default service;