import { useLocation } from 'react-router-dom';

export const useEntityId = () => {
  const location = useLocation();
  const route = location.pathname.split('/');
  const entityId = route[2] || null;
  return entityId;
};
