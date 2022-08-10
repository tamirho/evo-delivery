import { useLocation, useNavigate } from 'react-router-dom';
import { ViewStates } from '../../pages';

export const useNavigateToEntityViewState = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  
  return (state: ViewStates) => navigate(`..${state}${location.search}`);
};
