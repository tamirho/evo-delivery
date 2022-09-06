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
import RocketLaunch from '@mui/icons-material/RocketLaunch';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import DeleteIcon from '@mui/icons-material/Delete';

import { Draft } from '@backend/types/draft.type';
import { EntityList } from '../../../../features/entity-list/EntityList';
import { useNavigateToChild } from '../../../../hooks/router/use-navigate-to-child';
import { useGetEntities } from '../../../../hooks/entities/use-get-entities';
import { useEaRunDraft } from '../../../../hooks/ea/use-ea-run-draft';
import { useNavigateToRunId } from '../../../../hooks/router/use-navigate-to-runid';
import { useDeleteEntity } from '../../../../hooks/entities/use-delete-entity';
import { useNavigateToEntityViewState } from '../../../../hooks/router/use-navigate-to-view-state';
import { convertObjToNiceText } from '../common';
import { ENTITY_VIEW_STATES } from '../../../common';
import { EaComponentConfig } from '@backend/types';
import { capitalize, toHumanReadableStr } from '../../../../utils/string.utils';

export const Drafts = () => {
  const { data: drafts = [], isFetching, isLoading, isError } = useGetEntities();

  const goToDraft = useNavigateToChild();
  const runDraft = useEaRunDraft();
  const goToRunId = useNavigateToRunId();
  const deleteDraft = useDeleteEntity();
  const navigateToViewState = useNavigateToEntityViewState();

  const runDraftHandle = async (id: string) => {
    const runResponse = await runDraft(id);
    goToRunId(runResponse._id);
  };

  const renderSubTitle = (val: number | EaComponentConfig) => {
    if (val !== null && typeof val === 'object') {
      const name = val.name ? capitalize(toHumanReadableStr(val.name)) : '';
      const args = val.args ? convertObjToNiceText(val.args) : '';
      return `${name}${args ? ` {${args}}` : ''}`;
    } else {
      return val;
    }
  };

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
                  <Tooltip title='Delete'>
                    <IconButton
                      edge='end'
                      aria-label='comments'
                      size='small'
                      onClick={(e) => {
                        deleteDraft(draft._id);
                        e.stopPropagation();
                      }}
                    >
                      <DeleteIcon fontSize='inherit' />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Clone'>
                    <IconButton
                      edge='end'
                      aria-label='comments'
                      size='small'
                      onClick={(e) => {
                        navigateToViewState(ENTITY_VIEW_STATES.clone, draft._id);
                        e.stopPropagation();
                      }}
                    >
                      <CopyAllIcon fontSize='inherit' />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Run'>
                    <IconButton
                      edge='end'
                      aria-label='comments'
                      size='small'
                      onClick={(e) => {
                        runDraftHandle(draft._id);
                        e.stopPropagation();
                      }}
                    >
                      <RocketLaunch fontSize='inherit' />
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
                              {capitalize(toHumanReadableStr(key))} - {renderSubTitle(val)}
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
