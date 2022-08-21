import { useLocation, useNavigate } from 'react-router-dom';
import { ENTITY_VIEW_STATES } from '../../pages';

export const useNavigateToChild = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (id: string) => navigate(`${id}/${ENTITY_VIEW_STATES.view}${location.search}`);
};
