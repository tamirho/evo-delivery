import { useQuery } from '@tanstack/react-query';
import { fetchEntityList } from '../../api/entities/fetch-entity-list';
import { useEntityName } from '../router/use-entity-name';

export const useGetEntities = () => {
  const entityName = useEntityName();

  return useQuery([entityName], () => fetchEntityList(entityName));
};
