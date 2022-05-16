import { Location } from './location.type';

export type Order = Location & {
  shippingDate: Date;
  weight: number;
  createdAt: Date;
  updatedAt: Date;
};
