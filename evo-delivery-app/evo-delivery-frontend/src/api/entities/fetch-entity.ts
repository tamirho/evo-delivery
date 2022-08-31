export const fetchEntity = (entityName: string, entityId: string) => {
  return fetch(`api/v1/${entityName}/${entityId}`, {
    headers: {
      "Cache-Control": "no-cache",
    },
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((error) => {
      console.error('Error:', error);
    });
};
