import L from 'leaflet';
import { MapContainer, MapContainerProps, TileLayer, ZoomControl } from 'react-leaflet';
import { DEFAULT_CENTER_POSITION, DEFAULT_MAP_ZOOM, DEFAULT_SCROLL_WITH_ZOOM } from './common/constants';
import { ChangeView } from './ChangeView';

L.Icon.Default.imagePath = 'leaflet_images/';

type RoutesMapProps = MapContainerProps & {};

export const LeafletMap = ({
  center = DEFAULT_CENTER_POSITION,
  zoom = DEFAULT_MAP_ZOOM,
  scrollWheelZoom = DEFAULT_SCROLL_WITH_ZOOM,
  children,
  ...props
}: RoutesMapProps) => {
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={scrollWheelZoom} zoomControl={false} {...props}>
      <TileLayer
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        url='https://api.maptiler.com/maps/pastel/256/{z}/{x}/{y}.png?key=DZhCtHuWh6SXRgnbthLh'
      />
      <ChangeView center={center} zoom={zoom} /> 
      <ZoomControl position='topright' />
      {children}
    </MapContainer>
  );
};
