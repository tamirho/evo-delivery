import { useQueryClient } from '@tanstack/react-query';

export const useGetLocation = () => {
  const queryClient = useQueryClient();

  return {
    byAddress: (address: string = '') => {
      return queryClient.fetchQuery(['locations', address], () =>
        fetch(`api/v1/locations/?address=${address}/`)
          .then((res) => res.json())
          .then((res) => res.data)
          .catch((error) => {
            console.error('Error:', error);
          })
      );
    },
    byLatLang: (latlng: string | string[] | number[] = []) => {
      return queryClient.fetchQuery(['locations', latlng], () =>
        fetch(`api/v1/locations/?latlng=${latlng}/`)
          .then((res) => res.json())
          .then((res) => res.data)
          .catch((error) => {
            console.error('Error:', error);
          })
      );
    },
  };
};
