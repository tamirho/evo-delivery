import { useQueryClient } from '@tanstack/react-query';
import { useEntityName } from '../router/use-entity-name';

export const useDeleteEntity = () => {
  const entityName = useEntityName();
  const queryClient = useQueryClient();

  return (entityId: string) => {
    if (window.confirm(`Are you sure you want to delete this entity?\n(ID: ${entityId})`)) {
      queryClient.invalidateQueries();

      return fetch(`api/v1/${entityName}/${entityId}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };
};
