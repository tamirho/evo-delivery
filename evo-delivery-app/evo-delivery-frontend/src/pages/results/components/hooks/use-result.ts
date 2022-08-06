import { useQuery } from '@tanstack/react-query';

export const useResult = (resultId: string) => {
    return useQuery(['results', resultId], () => fetch(`api/v1/results/${resultId}`).then(res => res.json()))
}
