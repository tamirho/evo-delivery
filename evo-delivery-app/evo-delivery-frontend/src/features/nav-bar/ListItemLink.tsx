import * as React from 'react';
import ListItem, { ListItemProps } from '@mui/material/ListItem';
import { NavLink as RouterNavLink, NavLinkProps as RouterNavLinkProps } from 'react-router-dom';

type ListItemLinkProps = ListItemProps & {
  to: string;
};

export const ListItemLink = ({ to, children, ...props }: ListItemLinkProps) => {
  const renderLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<RouterNavLinkProps, 'to'>>(function Link(itemProps, ref) {
        return (
          <RouterNavLink
            style={({ isActive }) => {
              return {
                color: isActive ? 'primary' : '',
              };
            }}
            to={to}
            ref={ref}
            {...itemProps}
            role={undefined}
          />
        );
      }),
    [to]
  );

  return (
    <li>
      <ListItem component={renderLink} disablePadding>
        {children}
      </ListItem>
    </li>
  );
};
