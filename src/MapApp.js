/**
 * Главный компонент приложения
 */
import React from "react";
import Map from './components/MapBox';
import MapProvider from './MapProvider';
import { MapConsumer } from './MapContext';
import PointInput from "./components/PointInput";
import PointsList from "./components/PointsList";

export default function MapApp() {
  return (
    <>
      <MapProvider>
        <MapConsumer>
          {
            ({ setMapRef, setPointCoords, createPoint, points, updatePointsPosition, removePoint, mapLoaded }) => (
              <>
                {mapLoaded && <div className="points-container">
                  <PointInput createPoint={createPoint} />
                  <PointsList points={points} updatePointsPosition={updatePointsPosition} removePoint={removePoint} />
                </div>}
                <Map setMapRef={setMapRef} setPointCoords={setPointCoords} points={points} />
              </>
            )
          }
        </MapConsumer>
      </MapProvider>
    </>
  )
}

