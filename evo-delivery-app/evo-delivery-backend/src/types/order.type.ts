import {Location} from './location.type';

export type Order = Location & {
    shippingDate?: string;
    weight: number;
    createdAt: string;
    updatedAt: string;
};
