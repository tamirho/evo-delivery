export const fetchResultByDraftId = (id: string) => {
  return fetch(`api/v1/results/draft/${id}/`)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((error) => {
      console.error('Error:', error);
    });
};
