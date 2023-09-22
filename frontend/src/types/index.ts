export interface BikeProps {
  id: number;
  idUser: number;
  idBrand: string;
  idCategory: string
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

export interface BrandProps {
  id: number;
  name: string;
}

export interface CategoryProps {
  id: number;
  name: string;
}

export interface UserProps {
  id: number;
  alias: string;
  mail: string;
  phone: string;
}

export interface Error {
  error: string;
  props: string;
}
