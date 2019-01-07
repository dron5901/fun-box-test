import React from 'react';
import { mount } from 'enzyme';
import PointItem from './PointItem';
import Point from '../models/Point';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

it('Компонент должен отрисоваться', () => {
  let removePoint = jest.fn();
  let onDragEnd = jest.fn();
  let point = new Point('point1', 1, 1, 0);

  let pointItemWrapper = mount((
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppableId">
        {(provided) => (
          <div ref={provided.innerRef}>
            <PointItem removePoint={removePoint} point={point} />}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  ));

  expect(pointItemWrapper.find('.point-item-name')).toHaveLength(1);
  expect(pointItemWrapper.find('.point-item-name').text()).toEqual('point1');
  expect(pointItemWrapper.find('.point-item-action__remove')).toHaveLength(1);
});

it('Должен произойти вызов фунции удаления пункта', () => {
  let removePoint = jest.fn();
  let onDragEnd = jest.fn();
  let point = new Point('point1', 1, 1, 0);

  let pointItemWrapper = mount((
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppableId">
        {(provided) => (
          <div ref={provided.innerRef}>
            <PointItem removePoint={removePoint} point={point} />}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  ));

  let removeButton = pointItemWrapper.find('.point-item-action__remove');
  removeButton.simulate('click');
  expect(removePoint.mock.calls.length).toBe(1);
});