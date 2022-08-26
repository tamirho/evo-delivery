export const fetchEntityList = (entityName: string) => {
  return fetch(`api/v1/${entityName}/`)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((error) => {
      console.error('Error:', error);
    });
};
