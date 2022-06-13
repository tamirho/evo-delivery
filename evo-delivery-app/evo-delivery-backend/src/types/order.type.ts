import { Location } from './location.type';

export type Order = Location & {
  _id?:string;
  shippingDate: Date;
  weight: number;
  createdAt: Date;
  updatedAt: Date;
};
