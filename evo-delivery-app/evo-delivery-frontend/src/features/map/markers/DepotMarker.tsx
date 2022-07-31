import { CircleMarker, Popup } from 'react-leaflet';
import { Typography } from '@mui/material';
import { Depot } from '@backend/types';

export const DepotMarker = ({ depot }: { depot: Depot }) => {
  return (
    <CircleMarker center={[depot.latitude!, depot.longitude!]} pathOptions={{ color: 'red' }} radius={10}>
      <Popup>
        <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} component='div'>
          Depot Details
        </Typography>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {`ID: ${depot._id}`} <br />
          {`Address: ${depot.address}`} <br />
          {`Name: ${depot.name}`} <br />
        </Typography>
      </Popup>
    </CircleMarker>
  );
};

