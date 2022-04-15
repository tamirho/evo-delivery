export type RegularAddress = {
  state: string;
  city: string;
  street: string;
  buildingNumber: number;
  apartmentNumber: number;
  postalCode: number;
};

export type CoordinatesAddress = {
  latitude: string;
  longitude: string;
};

export type Address = RegularAddress | CoordinatesAddress;
