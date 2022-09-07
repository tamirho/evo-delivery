import { useLocation, useNavigate } from "react-router-dom";
import { ViewStates } from "../../pages";
import { useEntityId } from "./use-entity-id";

export const useNavigateToEntityViewState = () => {
  const navigate = useNavigate();
  const entityId = useEntityId();
  const location = useLocation();

  return (state: ViewStates, newId?: string) =>
    navigate(`../${newId || entityId}/${state}${location.search}`);
};
