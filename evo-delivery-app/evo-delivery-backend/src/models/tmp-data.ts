import {Driver, IdWithAddress, Order} from '../types';

export const DRIVERS: Partial<Driver>[] = [
    {
        id: '11',
        name: 'Tamir',
        maxCapacity: 300,
        maxDistance: 400
    },
    {
        id: '12',
        name: 'Yuval',
        maxCapacity: 200,
        maxDistance: 900
    },
    {
        id: '13',
        name: 'Vladi',
        maxCapacity: 500,
        maxDistance: 150
    }
];

export const ORDERS: Partial<Order>[] = [
    {
        id: '21',
        address: 'Ashdod',
        weight: 5
    },
    {
        id: '22',
        address: 'Eilat',
        weight: 34
    },
    {
        id: '23',
        address: 'Kiryat Shemona',
        weight: 1
    }
];

export const ROOTS: IdWithAddress[] = [
    {
        id: '0',
        address: 'Lod',
    }
];