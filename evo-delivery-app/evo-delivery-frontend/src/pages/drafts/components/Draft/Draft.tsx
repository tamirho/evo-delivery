import { useEffect, useContext } from 'react';
import { Alert, AlertTitle, Stack, Skeleton, List, ListSubheader, Box, Button } from '@mui/material';

import WarehouseIcon from '@mui/icons-material/Warehouse';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
import RocketLaunch from '@mui/icons-material/RocketLaunch';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import DeleteIcon from '@mui/icons-material/Delete';

import { mapActions, MapContext } from '../../../../features/map/context';
import { CollapsibleListItem } from '../../../../features/entity-list/CollapsibleListItem';
import { useGetEntity } from '../../../../hooks/entities/use-get-entity';
import { useEntityId } from '../../../../hooks/router/use-entity-id';
import { useNavigateToRunId } from '../../../../hooks/router/use-navigate-to-runid';
import { useEaRunDraft } from '../../../../hooks/ea/use-ea-run-draft';
import { useDraftRuns } from '../../hooks/use-draft-runs';
import { useDeleteEntity } from '../../../../hooks/entities/use-delete-entity';
import { useNavigateToEntityViewState } from '../../../../hooks/router/use-navigate-to-view-state';

import { DepotItems } from './list-items/DepotItems';
import { OrderItems } from './list-items/OrderItems';
import { DriverItems } from './list-items/DriverItems';
import { ShowDraftConfig } from './list-items/ShowDraftConfig';
import { DraftHistory } from './list-items/DraftHistory';
import { ENTITY_VIEW_STATES } from '../../../common';

export const Draft = () => {
  const { dispatch } = useContext(MapContext);
  const draftId = useEntityId();

  const navigateToViewState = useNavigateToEntityViewState();
  const deleteDraft = useDeleteEntity();
  const runDraft = useEaRunDraft();
  const goToRunId = useNavigateToRunId();

  const {
    data: { draft } = {},
    isFetching: isFetchingEntity,
    isLoading: isLoadingEntity,
    isError: isErrorEntity,
  } = useGetEntity(draftId!);

  const {
    data: draftRuns,
    isFetching: isFetchingRuns,
    isLoading: isLoadingRuns,
    isError: isErrorRuns,
  } = useDraftRuns(draftId!);

  const handleRunClick = async () => {
    const runResponse = await runDraft(draftId!);
    goToRunId(runResponse._id);
  };

  useEffect(() => {
    if (draft) {
      dispatch({
        type: mapActions.UPDATE_STATE,
        payload: {
          orders: draft.data.orders || [],
          depots: [draft.data.depot],
        },
      });
    }

    return () => dispatch({ type: mapActions.CLEAR_STATE, payload: {} });
  }, [draft]);

  if (isErrorEntity) {
    return (
      <Alert severity='error' style={{ width: '100%', margin: 10 }}>
        <AlertTitle>Error</AlertTitle>
        Oh no! Something went wrong — <strong>check it out!</strong>
      </Alert>
    );
  }

  if (isLoadingEntity || isFetchingEntity) {
    return (
      <Stack spacing={1}>
        <Skeleton variant='text' width={320} />
        <Skeleton variant='text' width={320} />
        <Skeleton variant='text' width={440} />
        <Skeleton variant='rectangular' width={440} height={90} />
      </Stack>
    );
  }

  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }} component='nav'>
        <ListSubheader component='div' id='nested-list-subheader-data'>
          Data
        </ListSubheader>
        <CollapsibleListItem
          title='Depot'
          icon={<WarehouseIcon />}
          body={
            <DepotItems
              isLoading={isFetchingEntity || isLoadingEntity}
              isError={isErrorEntity}
              items={[draft.data.depot]}
            />
          }
        />
        <CollapsibleListItem
          title={`Orders (${draft.data.orders.length})`}
          icon={<InventoryIcon />}
          body={
            <OrderItems
              isLoading={isFetchingEntity || isLoadingEntity}
              isError={isErrorEntity}
              items={draft.data.orders}
            />
          }
        />
        <CollapsibleListItem
          title={`Drivers (${draft.data.drivers.length})`}
          icon={<DriveEtaIcon />}
          body={
            <DriverItems
              isLoading={isFetchingEntity || isLoadingEntity}
              isError={isErrorEntity}
              items={draft.data.drivers}
            />
          }
        />
        <ListSubheader component='div' id='nested-list-subheader-configuration'>
          Configuration
        </ListSubheader>
        <CollapsibleListItem
          title='Configuration'
          icon={<SettingsIcon />}
          body={
            <ShowDraftConfig
              isLoading={isFetchingEntity || isLoadingEntity}
              isError={isErrorEntity}
              config={draft.config}
            />
          }
        />
        {draftRuns?.length ? (
          <>
            <ListSubheader component='div' id='nested-list-subheader-configuration'>
              Run History
            </ListSubheader>
            <CollapsibleListItem
              title={`Runs (${draftRuns?.length})`}
              initOpen={false}
              icon={<ManageHistoryIcon />}
              body={
                <DraftHistory isLoading={isFetchingRuns || isLoadingRuns} isError={isErrorRuns} items={draftRuns} />
              }
            />
          </>
        ) : null}
      </List>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginRight: '20px',
          marginTop: '10px',
          paddingBottom: '20px',
        }}
      >
        <Button
          variant='outlined'
          color='error'
          style={{ borderRadius: 50, marginRight: 10 }}
          startIcon={<DeleteIcon />}
          onClick={() => draftId && deleteDraft(draftId)}
        >
          Delete
        </Button>
        <Button
          variant='outlined'
          color='primary'
          style={{ borderRadius: 50, marginRight: 10 }}
          startIcon={<CopyAllIcon />}
          onClick={() => navigateToViewState(ENTITY_VIEW_STATES.clone)}
        >
          Clone
        </Button>
        <Button
          type='submit'
          variant='contained'
          color='info'
          style={{ borderRadius: 50 }}
          startIcon={<RocketLaunch />}
          onClick={handleRunClick}
        >
          Run
        </Button>
      </Box>
    </Box>
  );
};
