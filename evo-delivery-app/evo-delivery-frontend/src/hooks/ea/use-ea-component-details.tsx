import { useQuery } from '@tanstack/react-query';
import { fetchEaComponentDetails } from '../../api/ea/fetch-ea-component-details';
import { EaComponentDetails } from '@backend/types';

const eaComponentDetailsKey = 'ea-component-details';

export const useEaComponentDetails = (componentType: string) => {
  return useQuery([eaComponentDetailsKey, componentType], () => {
    return fetchEaComponentDetails(componentType).then((data: { types: EaComponentDetails[] }) => data);
  });
};
