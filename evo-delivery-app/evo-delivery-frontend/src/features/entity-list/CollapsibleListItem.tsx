import { useState } from 'react';
import { Collapse, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export type CollapsibleListItemProps = { title: string; icon: JSX.Element; body: JSX.Element; initOpen?: boolean };

export const CollapsibleListItem = ({ title, icon, body, initOpen }: CollapsibleListItemProps) => {
  const [open, setOpen] = useState(!!initOpen);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <div style={{ paddingRight: 20, paddingLeft: 10 }}>{body}</div>
      </Collapse>
    </>
  );
};
