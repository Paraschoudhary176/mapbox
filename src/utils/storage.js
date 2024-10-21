import AsyncStorage from '@react-native-async-storage/async-storage';

const POLYGON_KEY = 'SAVED_POLYGONS';

export const savePolygon = async (polygon) => {
  try {
    const savedPolygons = await getSavedPolygons();
    const updatedPolygons = [...savedPolygons, polygon];
    await AsyncStorage.setItem(POLYGON_KEY, JSON.stringify(updatedPolygons));
  } catch (error) {
    console.error('Error saving polygon:', error);
  }
};

export const getSavedPolygons = async () => {
  try {
    const data = await AsyncStorage.getItem(POLYGON_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error retrieving polygons:', error);
    return [];
  }
};
