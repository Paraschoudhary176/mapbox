### Hi this was mapbox integration 

## libararies used with versions
    "@react-native-async-storage/async-storage": "^2.0.0",
    "@react-native-community/geolocation": "^3.4.0",
    "@react-navigation/native": "^6.1.18",
    "@react-navigation/native-stack": "^6.11.0",
    "@react-navigation/stack": "^6.4.1",
    "@rnmapbox/maps": "^10.1.31",
    "install": "^0.13.0",
    "npm": "^10.9.0",
    "react": "18.3.1",
    "react-native": "0.75.4",
    "react-native-geolocation-service": "^5.3.1",
    "react-native-gesture-handler": "^2.20.0",
    "react-native-safe-area-context": "^4.11.1",
    "react-native-screens": "^3.34.0"

## Changes Done in building the app
- build.gradlew both android and app
- package manager use npm 
- Added Dependecies to AndroidManifest.xml

## Project Directory Structure 
project-root/
├── src/
│   ├── components/
│   │   ├── MapViewComponent.js
│   │   ├── PolygonDrawingComponent.js
│   │   ├── MarkerClusteringComponent.js
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── MapScreen.js
│   ├── utils/
│   │   ├── storage.js
│   ├── config/
│   │   ├── mapboxConfig.js
│   ├── App.js
├── index.js
├── package.json

## release build would be present in root of the project namely apk

## Steps follow to run the project 
- npm i --f
- npm run android 
