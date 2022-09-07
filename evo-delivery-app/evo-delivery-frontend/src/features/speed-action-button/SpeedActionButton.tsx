import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { speedActionOptions } from './constants';
import { createSearchParams, useNavigate } from 'react-router-dom';

export const SpeedActionButton = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleActionClicked = async (
    action: Partial<{
      onClick?: () => Promise<void>;
      to?: { route?: string; params?: undefined };
    }>
  ) => {
    handleClose();
    if (action.onClick) {
      await action.onClick();
    }
    const searchParams = createSearchParams(action.to?.params);
    const urlTo = `${action.to ? action.to.route : ''}${searchParams ? `?${searchParams}` : ''}`;
    navigate(urlTo, { replace: true });
  };

  return (
    <>
      <SpeedDial
        ariaLabel='SpeedDial tooltip example'
        sx={{ position: 'absolute', bottom: 30, right: 30 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        
      >
        {speedActionOptions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            arrow
            onClick={() => handleActionClicked(action as any)}
          />
        ))}
      </SpeedDial>
    </>
  );
};
