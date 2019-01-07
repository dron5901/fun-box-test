import React from 'react';
import { mount } from 'enzyme';
import { DragDropContext } from 'react-beautiful-dnd';
import PointsList from './PointsList';
import PointItem from './PointItem';
import Point from '../models/Point';

it('Компонент должен отрисоваться', () => {
  let updatePointsPosition = jest.fn();
  let removePoint = jest.fn();
  let points = [
    { id: '0', name: 'point1', x: 0, y: 0, position: 0 },
    { id: '1', name: 'point2', x: 1, y: 1, position: 1 },
  ];

  let pointsListWrapper = mount(<PointsList
    points={points}
    updatePointsPosition={updatePointsPosition}
    removePoint={removePoint} />
  );

  expect(pointsListWrapper.props().points.length).toEqual(2);
  pointsListWrapper.find(DragDropContext).prop('onDragEnd')(() => { });
  pointsListWrapper.find(DragDropContext).prop('onDragEnd')(() => {
    return {
      destination: {
        index: 0
      }
    }
  });
});