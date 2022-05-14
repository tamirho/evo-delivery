export type Address = string | [number, number];

export type IdWithAddress = {
  id: string;
  address: Address;
}

export type Order = IdWithAddress & {
  shippingDate: Date;
  weight: number;
  createdAt: Date;
  updatedAt: Date;
};
