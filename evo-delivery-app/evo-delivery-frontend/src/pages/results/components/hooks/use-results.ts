import { useQuery } from '@tanstack/react-query';

export const useResults = () => {
    return useQuery(['results'], () => fetch(`api/v1/results`).then(res => res.json()))
}
