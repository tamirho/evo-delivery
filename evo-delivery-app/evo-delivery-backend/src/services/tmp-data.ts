import { Driver, Order } from '../types';

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
		maxDistance: 600
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
		address: 'Tel Aviv',
		weight: 5
	},
	{
		id: '22',
		address: 'Ramat Gan',
		weight: 34
	},
	{
		id: '23',
		address: 'Lod',
		weight: 1
	}
];
