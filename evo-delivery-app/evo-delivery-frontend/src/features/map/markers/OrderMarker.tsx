import { Marker, Popup } from 'react-leaflet';
import { Typography } from '@mui/material';
import { Order } from '@backend/types';

export const OrderMarker = ({ order }: { order: Order }) => {
  return (
    <Marker position={[order.latitude!, order.longitude!]}>
      <Popup>
        <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} component='div'>
          Order Details
        </Typography>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {`ID: ${order._id}`} <br />
          {`Address: ${order.address}`} <br />
          {`Shipping Date: ${new Date(order.shippingDate as string).toDateString()}`} <br />
          {`Weight: ${order.weight}`}
        </Typography>
      </Popup>
    </Marker>
  );
};

