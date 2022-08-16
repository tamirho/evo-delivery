import { useLocation, useNavigate } from 'react-router-dom';
import { ViewStates } from '../../pages';
import { useEntityId } from './use-entity-id';

export const useNavigateToEntityViewState = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const entityId = useEntityId();
  
  return (state: ViewStates) =>
    navigate(`../${entityId}/${state}${location.search}`);
};
