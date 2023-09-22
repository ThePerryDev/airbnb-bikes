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

export interface CategoriesProps{
  id:number;
  name:string;
}