import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useTitle } from '../../hooks/use-title';

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
  const title = useTitle();
  
  return (
    <DrawerHeader>
      <Typography variant='h6' noWrap component='div'>
        {title}
      </Typography>
      <IconButton onClick={handleClose}>
        <ChevronLeftIcon />
      </IconButton>
    </DrawerHeader>
  );
};
