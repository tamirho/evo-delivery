import { useLocation, useNavigate } from 'react-router-dom';

export const useNavigateToParent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return () => navigate(`..${location.search}`);
};
