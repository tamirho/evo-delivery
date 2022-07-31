import { useSearchParams } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';

import { DetailsPanelContent } from './DetailsPanelContent';
import { DetailsPanelHeader } from './DetailsPanelHeader';
import { PANEL_STATES, SEARCH_PARAMS } from '../../pages';
import { DETAILS_PANEL_WIDTH } from './constants';
import { NAV_BAR_WIDTH } from '../nav-bar/constants';

export type DetailsPanelProps = {};

const useSetSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let updatedSearchParams = new URLSearchParams(searchParams.toString());
  return (key: string, value: string) => {
    updatedSearchParams.set(key, value);
    setSearchParams(updatedSearchParams.toString());
  };
};

export const DetailsPanel = (props: DetailsPanelProps) => {
  const [searchParams] = useSearchParams();
  const panelState = searchParams.get(SEARCH_PARAMS.panel);

  const setSearchParam = useSetSearchParam();
  const handleClose = () => setSearchParam(SEARCH_PARAMS.panel, PANEL_STATES.close);

  return (
    <Drawer
      PaperProps={{
        square: false,
        style: { position: 'absolute', width: DETAILS_PANEL_WIDTH, marginLeft: NAV_BAR_WIDTH },
      }}
      BackdropProps={{ style: { position: 'absolute' } }}
      ModalProps={{
        style: { position: 'absolute' },
      }}
      sx={{
        width: DETAILS_PANEL_WIDTH,
        flexShrink: 0,
      }}
      variant='persistent'
      anchor='left'
      open={panelState === PANEL_STATES.open}
      onClose={handleClose}
      elevation={3}
    >
      <div
        style={{
          position: 'relative',
          overflow: 'auto',
        }}
      >
        <DetailsPanelHeader handleClose={handleClose} />
        <Divider />
        <DetailsPanelContent />
      </div>
    </Drawer>
  );
};
