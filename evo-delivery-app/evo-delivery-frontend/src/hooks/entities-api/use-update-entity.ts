import { useQueryClient } from '@tanstack/react-query';
import { useEntityName } from '../router/use-entity-name';

export const useUpdateEntity = () => {
  const entityName = useEntityName();
  const queryClient = useQueryClient();

  return (entityId: string, data: {} = {}) => {
    queryClient.invalidateQueries([entityName]);

    return fetch(`api/v1/${entityName}/${entityId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  };
};
