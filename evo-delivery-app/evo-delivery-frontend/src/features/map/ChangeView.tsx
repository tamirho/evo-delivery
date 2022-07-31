import React from 'react';
import { LatLngExpression } from 'leaflet';
import { useMap } from 'react-leaflet';

type ChangeViewProps = { center: LatLngExpression; zoom: number };

export const ChangeView = ({ center, zoom }: ChangeViewProps) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};
