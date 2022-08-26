import { useQuery } from '@tanstack/react-query';
import { fetchEntityList } from '../../api/entities/fetch-entity-list';

export const useGetEntitiesByName = (entityName: string) => {
  return useQuery([entityName], () => fetchEntityList(entityName));
};
