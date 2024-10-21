import React, { useState } from 'react';
import MapboxGL from '@rnmapbox/maps';
import { Button, View, StyleSheet } from 'react-native';

const PolygonDrawingComponent = ({ onPolygonDrawn, initialLongitude = 0, initialLatitude = 0 }) => {
  const [coordinates, setCoordinates] = useState([]);
  const [drawing, setDrawing] = useState(false);

  const handleMapPress = (e) => {
    if (drawing) {
      const { geometry } = e;
      const { coordinates: coords } = geometry;
      setCoordinates([...coordinates, coords]);
    }
  };

  const startDrawing = () => {
    setCoordinates([]);
    setDrawing(true);
  };

  const finishDrawing = () => {
    if (coordinates.length > 2) {
      onPolygonDrawn(coordinates);
    }
    setDrawing(false);
  };

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        style={styles.map}
        onPress={handleMapPress}
      >
        <MapboxGL.Camera
          zoomLevel={10}
          centerCoordinate={[initialLongitude, initialLatitude]}
        />
        {coordinates.length > 0 && (
          <MapboxGL.ShapeSource
            id="polygonSource"
            shape={{
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [coordinates],
              },
            }}
          >
            <MapboxGL.FillLayer
              id="polygonFill"
              style={{ fillColor: 'rgba(255, 0, 0, 0.5)' }}
            />
          </MapboxGL.ShapeSource>
        )}
      </MapboxGL.MapView>
      <View style={styles.buttonContainer}>
        {!drawing ? (
          <Button title="Start Drawing" onPress={startDrawing} />
        ) : (
          <Button title="Finish Drawing" onPress={finishDrawing} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
});

export default PolygonDrawingComponent;
