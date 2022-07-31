// import { Order } from '@backend/types';
import { useQuery } from '@tanstack/react-query';
// import { axiosHttpClient } from '../clients';

export const useOrders = () => {
    return useQuery(['orders'], () => fetch('api/v1/orders/').then(res => res.json()))
}
