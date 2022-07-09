import {Depot, Driver, Order} from '../types';

export const DRIVERS: Partial<Driver>[] = [
    {
        _id: '11',
        name: 'Tamir',
        maxCapacity: 15,
        maxDistance: 400
    },
    {
        _id: '12',
        name: 'Yuval',
        maxCapacity: 200,
        maxDistance: 600
    },
    {
        _id: '13',
        name: 'Vladi',
        maxCapacity: 500,
        maxDistance: 150
    },
    {
        _id: '14',
        name: 'Aviad',
        maxCapacity: 10,
        maxDistance: 10
    },
    {
        _id: '15',
        name: 'Spaghetti',
        maxCapacity: 10,
        maxDistance: 10
    }
];

export const ORDERS: Partial<Order>[] = [
    {
        _id: '21',
        address: 'Ashdod',
        weight: 5
    },
    {
        _id: '22',
        address: 'Eilat',
        weight: 34
    },
    {
        _id: '23',
        address: 'Kiryat Shemona',
        weight: 1
    },
    {
        _id: '24',
        address: 'Jerusalem',
        weight: 10
    },
    {
        _id: '25',
        address: 'Haifa',
        weight: 10
    }
];

export const DEPOTS: Partial<Depot>[] = [
    {
        _id: '0',
        address: 'Lod',
    },
    {
        _id: '1',
        address: 'Ashdod',
    }
];