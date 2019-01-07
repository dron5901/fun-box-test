import React from 'react';
const MapContext = React.createContext({});
export default MapContext;
export const MapProvider = MapContext.Provider;
export const MapConsumer = MapContext.Consumer;