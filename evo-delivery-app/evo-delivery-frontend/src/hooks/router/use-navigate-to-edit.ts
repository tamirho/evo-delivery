import { useLocation, useNavigate } from "react-router-dom";
import { ViewStates } from "../../pages";
import { useGetEntity } from "../entities-api/use-get-entity";
import { useEntityId } from "./use-entity-id";
import { useEntityName } from "./use-entity-name";

export const useNavigateToEntityViewState = () => {
  const navigate = useNavigate();
  const entityId = useEntityId();
  const entityName = useEntityName();
  const location = useLocation();

  return (state: ViewStates) =>
    navigate(`../${entityId}/${state}${location.search}`);
};
