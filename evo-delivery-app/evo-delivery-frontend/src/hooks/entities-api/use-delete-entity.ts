import { useQueryClient } from '@tanstack/react-query';
import { useEntityName } from '../router/use-entity-name';

export const useDeleteEntity = () => {
  const entityName = useEntityName();
  const queryClient = useQueryClient();

  return (entityId: string) => {
    queryClient.invalidateQueries([entityName]);

    return fetch(`api/v1/${entityName}/${entityId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  };
};
