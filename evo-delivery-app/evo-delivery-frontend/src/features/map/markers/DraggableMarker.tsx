import { Marker, MarkerProps, Popup } from 'react-leaflet'
import { useState, useRef, useMemo, useCallback } from 'react'

export type DraggableMarkerProps = MarkerProps & {}

export const DraggableMarker = (props: DraggableMarkerProps) => {
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(props.position)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current as any;
          if (marker != null) {
            setPosition(marker.getLatLng() as any)
          }
        },
      }),
      [],
    )
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])
  
    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}>
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? 'Marker is draggable'
              : 'Click here to make marker draggable'}
          </span>
        </Popup>
      </Marker>
    )
  }