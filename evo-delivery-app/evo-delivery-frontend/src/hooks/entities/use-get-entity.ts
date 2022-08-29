import { useQuery } from '@tanstack/react-query';
import { fetchEntity } from '../../api/entities/fetch-entity';
import { useEntityName } from '../router/use-entity-name';

export const useGetEntity = (entityId: string) => {
  const entityName = useEntityName();

  return useQuery([entityName, entityId], () => fetchEntity(entityName, entityId));
};
