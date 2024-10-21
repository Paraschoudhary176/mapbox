import React, { useEffect, useState } from 'react';
import MapboxGL from '@rnmapbox/maps';
import { View, StyleSheet } from 'react-native';
import { MAPBOX_ACCESS_TOKEN } from '../config/mapboxConfig';
import PolygonDrawingComponent from './PolygonDrawingComponent';
import MarkerClusteringComponent from './MarkerClusteringComponent';
import { getPolygonData } from '../utils/storage';

// Set the Mapbox access token
MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

const MapViewComponent = () => {
  const [polygons, setPolygons] = useState([]);

  useEffect(() => {
    const loadPolygons = async () => {
      const savedPolygons = await getPolygonData('polygons');
      setPolygons(savedPolygons);
    };
    loadPolygons();
  }, []);

  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera zoomLevel={8} centerCoordinate={[77.5946, 12.9716]} />
        <PolygonDrawingComponent setPolygons={setPolygons} />
        <MarkerClusteringComponent polygons={polygons} />
      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapViewComponent;
