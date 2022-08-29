import { useQuery } from '@tanstack/react-query';
import { useEntityName } from '../router/use-entity-name';

export const useGetEntity = (entityId: string) => {
  const entityName = useEntityName();

  return useQuery([entityName, entityId], () =>
    fetch(`api/v1/${entityName}/${entityId}`)
      .then((res) => res.json())
      .then((res) => res.data)
      .catch((error) => {
        console.error('Error:', error);
      })
  );
};
