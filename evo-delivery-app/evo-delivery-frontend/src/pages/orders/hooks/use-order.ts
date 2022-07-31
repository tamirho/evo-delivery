import { useQuery } from '@tanstack/react-query';

export const useOrder = (orderId: string) => {
    return useQuery(['orders', orderId], () => fetch(`api/v1/orders/${orderId}`).then(res => res.json()))
}
