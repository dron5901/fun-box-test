/**
 * Компонент отображения точки в списке
 */
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

function PointItem({ point, removePoint }) {

  /**
   * Удалить точку
   * 
   * @param {string} id Идентификатор точки
   */
  let removeItem = (id) => {
    removePoint(id);
  }

  return (
    <Draggable draggableId={point.id} index={point.position}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} className="point-list-item"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span className="point-item-name" title={point.name}>{point.name}</span>
          <button type="button"
            onClick={removeItem.bind(null, point.id)}
            className="point-item-action__remove"
            title="Удалить точку"> &times; </button>
        </div>
      )}
    </Draggable>
  );
}

PointItem.propTypes = {
  removePoint: PropTypes.func.isRequired,
  point: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    x: PropTypes.number,
    y: PropTypes.number,
    position: PropTypes.number.isRequired
  }).isRequired
}

export default PointItem;