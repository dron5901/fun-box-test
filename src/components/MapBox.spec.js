import React from 'react';
import { mount } from 'enzyme';
import MapBox from './MapBox';
import Point from '../models/Point'

it('Карта должна отрисоваться', async () => {
  let points = [
    { id: '0', name: 'point1', x: 0, y: 0, position: 0 },
    { id: '1', name: 'point2', x: 1, y: 1, position: 1 },
  ];
  let setMapRef = jest.fn();
  let setPointCoords = jest.fn(); 
  let mapWrapper = mount(<MapBox setMapRef={setMapRef} setPointCoords={setPointCoords} points={points} />);
  expect(mapWrapper).toMatchSnapshot();
  expect(mapWrapper.instance().props.points.length).toEqual(2);
  await mapWrapper.instance().mapLoadPromise;
  expect(mapWrapper.state("mapInstance")).not.toEqual(null);
  expect(setMapRef.mock.calls.length).toBe(1);
});