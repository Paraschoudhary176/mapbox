import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import PolygonDrawingComponent from '../components/PolygonDrawingComponent';
import {getSavedPolygons, savePolygon} from '../utils/storage';
import {MAPBOX_ACCESS_TOKEN} from '../config/mapboxConfig';
import MarkerClusteringComponent from '../components/MarkerClusteringComponent';

MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

const generateRandomPolygons = () => {
  // Generate 10-15 random polygons
  const randomPolygons = [];
  for (let i = 0; i < Math.floor(Math.random() * 5) + 10; i++) {
    const polygon = [
      [Math.random() * 180 - 90, Math.random() * 360 - 180],
      [Math.random() * 180 - 90, Math.random() * 360 - 180],
      [Math.random() * 180 - 90, Math.random() * 360 - 180],
      [Math.random() * 180 - 90, Math.random() * 360 - 180],
    ];
    randomPolygons.push(polygon);
  }
  return randomPolygons;
};

const MapScreen = () => {
  const [polygons, setPolygons] = useState([]);
  const [randomPolygons, setRandomPolygons] = useState([]);

  useEffect(() => {
    const loadPolygons = async () => {
      const savedPolygons = await getSavedPolygons();
      setPolygons(savedPolygons);
      setRandomPolygons(generateRandomPolygons());
    };
    loadPolygons();
  }, []);

  const handlePolygonDrawn = newPolygon => {
    setPolygons([...polygons, newPolygon]);
    savePolygon(newPolygon);
  };

  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera zoomLevel={10} centerCoordinate={[0, 0]} />
        {[...polygons, ...randomPolygons].map((polygon, index) => (
          <MapboxGL.ShapeSource
            key={`polygon-${index}`}
            id={`polygon-${index}`}
            shape={{
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [polygon],
              },
            }}>
            <MapboxGL.FillLayer
              id={`polygonFill-${index}`}
              style={{fillColor: 'rgba(0, 255, 0, 0.5)'}}
            />
          </MapboxGL.ShapeSource>
        ))}
        <MarkerClusteringComponent
          markers={polygons.concat(randomPolygons).map(p => p[0])}
        />
      </MapboxGL.MapView>
      <PolygonDrawingComponent onPolygonDrawn={handlePolygonDrawn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  map: {flex: 1},
});

export default MapScreen;
