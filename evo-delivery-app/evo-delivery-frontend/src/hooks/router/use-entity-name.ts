import { useLocation } from 'react-router-dom';

export const useEntityName = () => {
  const location = useLocation();
  const route = location.pathname.split('/');
  const entityName = route[1];
  return entityName;
};
