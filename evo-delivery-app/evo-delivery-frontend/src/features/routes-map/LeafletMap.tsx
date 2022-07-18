import { MapContainer, MapContainerProps, TileLayer } from 'react-leaflet';
import { DEFAULT_CENTER_POSITION, DEFAULT_MAP_ZOOM, DEFAULT_SCROLL_WITH_ZOOM } from './common/constants';

type RoutesMapProps = MapContainerProps & {};

export const LeafletMap = ({
  center = DEFAULT_CENTER_POSITION,
  zoom = DEFAULT_MAP_ZOOM,
  scrollWheelZoom = DEFAULT_SCROLL_WITH_ZOOM,
  children,
  ...props
}: RoutesMapProps) => {
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={scrollWheelZoom} {...props}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {children}
    </MapContainer>
  );
};
