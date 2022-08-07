import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { toSingular } from '../../utils/string.utils';

import { useTitle } from '../../hooks/router/use-title';
import { useEntityName } from '../../hooks/router/use-entity-name';
import { useLocation, useNavigate } from 'react-router-dom';
import { ENTITY_VIEW_STATES } from '../../pages';

const DrawerHeader = styled('div')(({ theme }) => ({
  marginLeft: 10,
  display: 'flex',
  alignItems: 'center',
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));

type DetailsPanelHeaderProps = {
  handleClose: () => void;
};

export const DetailsPanelHeader = ({ handleClose }: DetailsPanelHeaderProps) => {
  const entityName = useEntityName();
  const title = useTitle();

  const location = useLocation();
  const navigate = useNavigate();
  const goToCreateNewEntityPage = () => navigate(`${entityName}/${ENTITY_VIEW_STATES.create}${location.search}`);
  const showCreateButton = !(location.pathname.includes('runs') || location.pathname.endsWith('create'));

  return (
    <DrawerHeader>
      <>
        <Typography variant='h6' noWrap component='div'>
          {title}
        </Typography>
        {showCreateButton ? (
          <Button
            variant='outlined'
            color='info'
            style={{ borderRadius: 50 }}
            startIcon={<AddIcon />}
            onClick={goToCreateNewEntityPage}
          >
            {`Create New ${toSingular(entityName)}`}
          </Button>
        ) : null}
      </>
      <IconButton onClick={handleClose}>
        <ChevronLeftIcon />
      </IconButton>
    </DrawerHeader>
  );
};
