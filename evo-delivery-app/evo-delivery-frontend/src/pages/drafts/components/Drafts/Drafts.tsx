import { useContext } from 'react';
import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import RocketLaunch from '@mui/icons-material/RocketLaunch';

import { Draft } from '@backend/types/draft.type';
import { EntityList } from '../../../../features/entity-list/EntityList';
import { MapContext } from '../../../../features/map/context';
import { useFocusLocation } from '../../../../hooks/map/use-focus-location';
import { useNavigateToChild } from '../../../../hooks/router/use-navigate-to-child';
import { useGetEntities } from '../../../../hooks/entities-api/use-get-entities';
import { useDeleteEntity } from '../../../../hooks/entities-api/use-delete-entity';

export const Drafts = () => {
  const { dispatch } = useContext(MapContext);
  const { data: drafts = [], isFetching, isLoading, isError } = useGetEntities();

  const goToDraft = useNavigateToChild();
  const deleteDraft = useDeleteEntity();
  const focusLocation = useFocusLocation();

  //   useEffect(() => {
  //     if (drafts) {
  //       dispatch({ type: mapActions.UPDATE_STATE, payload: { orders: drafts, zoom: 12 } });
  //     }

  //     return () => dispatch({ type: mapActions.CLEAR_STATE, payload: {} });
  //   }, [drafts]);

  return (
    <EntityList
      isLoading={isFetching || isLoading}
      isError={isError}
      items={drafts}
      renderItem={(draft: Draft) =>
        draft ? (
          <div key={`div_${draft._id}`}>
            <ListItem
              key={draft._id}
              disablePadding
              alignItems='center'
              secondaryAction={
                <>
                  <Tooltip title='Run'>
                    <IconButton edge='end' aria-label='comments' size='small' onClick={() => alert('Run!')}>
                      <RocketLaunch fontSize='inherit' />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Delete'>
                    <IconButton edge='end' aria-label='comments' size='small' onClick={() => deleteDraft(draft._id)}>
                      <DeleteIcon fontSize='inherit' />
                    </IconButton>
                  </Tooltip>
                </>
              }
            >
              <ListItemButton onClick={() => goToDraft(draft._id)}>
                <ListItemAvatar>
                  <Avatar>
                    <DescriptionIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`ID: ${draft._id}`}
                  secondary={
                    <>
                      <Typography component='span' variant='body2' color='text.primary'>
                        {Object.entries(draft.config).map(([key, val]) => {
                          return (
                            <>
                              {key}: {val}
                              <br />
                            </>
                          );
                        })}
                      </Typography>
                    </>
                  }
                />
              </ListItemButton>
            </ListItem>
            <Divider key={`divider_${draft._id}`} variant='middle' component='li' />
          </div>
        ) : null
      }
    />
  );
};
