import { useLocation, useNavigate } from "react-router-dom";
import { ENTITY_VIEW_STATES } from "../../pages/common";

export const useNavigateToRunId = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (id: string) =>
    navigate(`../../results/${id}/${ENTITY_VIEW_STATES.view}${location.search}`);
};
