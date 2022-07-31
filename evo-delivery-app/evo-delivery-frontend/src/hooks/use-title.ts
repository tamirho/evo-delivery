import { useLocation } from 'react-router-dom';
import { ENTITY_VIEW_STATES } from '../pages';
import { capitalize, toPlural, toSingular } from '../utils/string.utils';

export const useTitle = () => {
  const location = useLocation();
  const route = location.pathname.split('/');
  const entityName = route[1];
  const action = route.at(-1);

  switch (action) {
    case entityName:
      return `${capitalize(toPlural(entityName))} Details`;
    case ENTITY_VIEW_STATES.view:
      return `${capitalize(toSingular(entityName))} Details`;
    case ENTITY_VIEW_STATES.create:
      return `Create New ${capitalize(toSingular(entityName))}`;
    case ENTITY_VIEW_STATES.edit:
      return `Edit ${capitalize(toSingular(entityName))}`;
    case ENTITY_VIEW_STATES.delete:
      return `Delete ${capitalize(toSingular(entityName))}`;
    default:
      return '';
  }
};
