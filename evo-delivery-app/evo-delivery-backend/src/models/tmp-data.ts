import {Depot, Driver, Order} from '../types';

export const DRIVERS: Partial<Driver>[] = [
    {
        id: '11',
        name: 'Tamir',
        maxCapacity: 15,
        maxDistance: 400
    },
    {
        id: '12',
        name: 'Yuval',
        maxCapacity: 200,
        maxDistance: 600
    },
    {
        id: '13',
        name: 'Vladi',
        maxCapacity: 500,
        maxDistance: 150
    },
    {
        id: '14',
        name: 'Aviad',
        maxCapacity: 10,
        maxDistance: 10
    },
    {
        id: '15',
        name: 'Spaghetti',
        maxCapacity: 10,
        maxDistance: 10
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
    },
    {
        id: '24',
        address: 'Jerusalem',
        weight: 10
    },
    {
        id: '25',
        address: 'Haifa',
        weight: 10
    }
];

export const DEPOTS: Partial<Depot>[] = [
    {
        id: '0',
        address: 'Lod',
    },
    {
        id: '1',
        address: 'Ashdod',
    }
];