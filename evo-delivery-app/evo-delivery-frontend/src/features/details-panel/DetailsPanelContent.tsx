import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';

const DrawerContent = styled('div')(({ theme }) => ({
  margin: 5,
  display: 'flex',
  alignItems: 'center',
  ...theme.mixins.toolbar,
}));

type DetailsPanelContentProps = {
};

export const DetailsPanelContent = (props: DetailsPanelContentProps) => {
  return (
    <DrawerContent>
      <Outlet />
    </DrawerContent>
  );
};
