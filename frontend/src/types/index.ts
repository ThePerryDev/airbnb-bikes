export interface BikeProps {
  id: number;
  idUser: number;
  category: CategoriesProps;
  brand: BrandProps;
  name: string;
  color: string;
  size: number;
  material: string;
  gender: string;
  speedkit: number;
  rim: number;
  suspension: boolean;
  description: string;
  hourlyvalue: number;
  dailyvalue: number;
  latitude: number;
  longitude: number;
  user: UsersProps;
  photos: PhotoProps[];
}

export interface CategoriesProps {
  id: number;
  name: string;
}

export interface UsersProps {
  id: number;
  alias: string;
  mail: string;
  phone: string;
  token: string;
}

export interface Error {
  error: string;
  props: string;
}
export interface BrandProps {
  id: number;
  name: string;
}

export interface RentsProps {
  id: number;
  idBike: number;
  idClient: number;
  idOwner: number;
  rentalDate: Date;
  returnDate: Date;
  ownerValuation: number;
  clientValuation: number;
}

export interface PhotoProps {
  id: number;
  filename: string;
}

export interface EnderecoProps {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  cep: string;
  numero: string
}