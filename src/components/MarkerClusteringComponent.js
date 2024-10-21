import React from 'react';
import MapboxGL from '@rnmapbox/maps';

const MarkerClusteringComponent = ({markers}) => (
  <MapboxGL.ShapeSource
    id="clusterSource"
    shape={{
      type: 'FeatureCollection',
      features: markers.map((coords, index) => ({
        type: 'Feature',
        properties: {id: index},
        geometry: {
          type: 'Point',
          coordinates: coords,
        },
      })),
    }}
    cluster
    clusterRadius={50}>
    <MapboxGL.SymbolLayer
      id="clusteredPoints"
      style={{
        iconImage: 'marker-15',
        iconSize: 1.2,
      }}
    />
    <MapboxGL.CircleLayer
      id="clusteredCircle"
      belowLayerID="clusteredPoints"
      style={{
        circleColor: 'red',
        circleRadius: 20,
      }}
    />
  </MapboxGL.ShapeSource>
);

export default MarkerClusteringComponent;
