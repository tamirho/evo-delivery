import { useQuery } from '@tanstack/react-query';
import { useEntityName } from '../router/use-entity-name';

export const useGetEntities = () => {
  const entityName = useEntityName();

  return useQuery([entityName], () =>
    fetch(`api/v1/${entityName}/`)
      .then((res) => res.json())
      .then((res) => res.data)
      .catch((error) => {
        console.error('Error:', error);
      })
  );
};
