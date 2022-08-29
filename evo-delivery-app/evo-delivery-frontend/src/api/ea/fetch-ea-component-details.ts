export const fetchEaComponentDetails = (componentType: string) => {
  return fetch(`api/v1/ea-engine/${componentType}/details`)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((error) => {
      console.error('Error:', error);
    });
};
