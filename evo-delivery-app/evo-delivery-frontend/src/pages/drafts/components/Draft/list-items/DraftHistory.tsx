import {
  Typography,
  ListItemText,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  CircularProgress,
} from '@mui/material';

import RouteIcon from '@mui/icons-material/Route';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { EvaluateResult } from '@backend/types';
import { EntityList } from '../../../../../features/entity-list/EntityList';
import { useNavigateToResult } from '../../../hooks/use-navigate-to-result';

export type DraftHistoryProps = {
  items: EvaluateResult[];
  isLoading: boolean;
  isError: boolean;
};

export const DraftHistory = ({ items, isLoading, isError }: DraftHistoryProps) => {
  const navigateToResult = useNavigateToResult();
  return (
    <EntityList
      dense={true}
      isLoading={isLoading}
      isError={isError}
      items={items}
      renderItem={(result: EvaluateResult) => (
        <>
          <ListItem key={result._id} disablePadding alignItems='center'>
            <ListItemButton
              onClick={() => {
                navigateToResult(result._id as string);
              }}
            >
              <ListItemIcon>
                {result.eaError ? (
                  <ErrorOutlineIcon color='error'/>
                ) : result.isDone === false ? (
                  <CircularProgress size={20} />
                ) : (
                  <RouteIcon />
                )}
              </ListItemIcon>
              <ListItemText
                primary={`ID: ${result._id}`}
                secondary={
                  <Typography component='span' variant='caption' color='text.muted'>
                    {`Created At: ${new Date(result.createdAt as string).toDateString()}`} <br />
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
          <Divider key={`divider_${result._id}`} variant='middle' component='li' />
        </>
      )}
    />
  );
};
