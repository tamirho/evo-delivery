import { Address } from './address.type';

export type Order = {
  id: string;
  shippingAddress: Address;
  shippingDate: Date;
  weight: number;
};
