import { Location } from './location.type';

export type Depot = Location & {
    name: string;
    createdAt: Date;
    updatedAt: Date;
}