export interface BikeProps {
  id: number;
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
}

export enum Valuation {
  pessimo = 1,
  ruim = 2,
  normal = 3,
  bom = 4,
  otimo = 5,
}

export interface RentsProps {
  id:number;
  idBike:number;
  idClient:number;
  idOwner:number;
  date:Date;
  ownerValuation: Valuation;
  clientValuation: Valuation;
}
