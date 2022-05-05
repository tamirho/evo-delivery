export type Address = string | [number, number];

export type Order = {
  id: string;
  shippingAddress: Address;
  shippingDate: Date;
  weight: number;
  createdAt: Date;
  updatedAt: Date;
};
