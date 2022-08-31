import { useQueryClient } from '@tanstack/react-query';
import { useEntityName } from '../router/use-entity-name';

export const useCreateEntity = () => {
  const entityName = useEntityName();
  const queryClient = useQueryClient();

  return (data: {} = {}) => {
    queryClient.invalidateQueries([entityName], { exact: true });

    return fetch(`api/v1/${entityName}/`, {
      method: 'POST',
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
