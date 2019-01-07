/**
 * Список точек
 */
import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import PointItem from './PointItem';

function PointsList({ points, updatePointsPosition, removePoint }) {
  
  /**
   * Завершить перетаскивание
   * 
   * @param {Object:{destination, source}} result. Результат перетскивания 
   */
  let dragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    updatePointsPosition(
      points,
      result.source.index,
      result.destination.index
    );
  }

  return (
    points.length > 0 && <DragDropContext onDragEnd={dragEnd}>
      <Droppable droppableId="points-droppable-list">
        {(provided, shapshot) => (
          <div ref={provided.innerRef} className="point-list"
          >
            {points.map(point => {
              return <PointItem key={point.id} point={point} removePoint={removePoint} />
            })}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

PointsList.propTypes = {
  points: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    x: PropTypes.number,
    y: PropTypes.number,
    position: PropTypes.number.isRequired
  })).isRequired,
  updatePointsPosition: PropTypes.func.isRequired,
  removePoint: PropTypes.func.isRequired,
}

export default PointsList;
