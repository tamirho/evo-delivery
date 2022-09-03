import { useQuery } from '@tanstack/react-query';
import { fetchResultByDraftId } from '../../../api/entities/fetch-result-by-draft-id';

export const useDraftRuns = (draftId: string) => {
  return useQuery(['runs', draftId], () => fetchResultByDraftId(draftId));
};
