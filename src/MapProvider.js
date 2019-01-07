/**
 * Провайдер данных приложения
 */
import React from 'react';
import Point from './models/Point';
import Context from './MapContext';

export default class MapProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapInstance: null,
      points: []
    };

    this.setMapRef = this.setMapRef.bind(this);
    this.createPoint = this.createPoint.bind(this);
    this.setPointCoords = this.setPointCoords.bind(this);
    this.updatePointsPosition = this.updatePointsPosition.bind(this);
    this.removePoint = this.removePoint.bind(this);
  }

  /**
   * Установить инстанс карты
   * 
   * @param {Ymap} mapInstance. Инстанс карты 
   */
  setMapRef(mapInstance) {
    this.setState({
      mapInstance
    });
  }

  /**
   * Создать точку
   * 
   * @param {string} name. Наименование точки
   */
  createPoint(name) {
    let [x, y] = this.state.mapInstance.getCenter();
    let point = new Point(name, x, y, this.state.points.length);
    this.setState({
      points: [...this.state.points, point]
    });
  }

  /**
   * Удалить точку
   * 
   * @param {string} id. Идентификатор точки.
   */
  removePoint(id) {
    this.setState({
      points: this.state.points.filter(point => point.id !== id)
    });
  }

  /**
   * Установить координаты точки
   * 
   * @param {string} id. Идентификактор точки.
   * @param {int} x. Координата x.
   * @param {int} y. Координата y.
   */
  setPointCoords(id, x, y) {
    this.setState((prevState) => {
      return {
        points: prevState.points.map(point => {
          if (point.id === id) {
            point.x = x;
            point.y = y;
            return point;
          }

          return point;
        })
      }
    });
  }

  /**
   * Обновить позиции в точках при их перемещении с помощью dnd/
   * 
   * @param {Array<Point>} points. Массив точек 
   * @param {int} startIndex. Позиция в массиве откуда перемещается точка  
   * @param {int} endIndex. Позиция в массиве куда перемещается точка 
   */
  updatePointsPosition(points, startIndex, endIndex) {
    const [removed] = points.splice(startIndex, 1);
    points.splice(endIndex, 0, removed);
    points = points.map((item, position) => {
      item.position = position;
      return item;
    });

    this.setState({
      points
    });
  }

  render() {
    let providerValue = {
      mapLoaded: !!this.state.mapInstance,
      points: this.state.points.sort((currentValue, nextValue) => currentValue.position - nextValue.position),
      setMapRef: this.setMapRef,
      createPoint: this.createPoint,
      removePoint: this.removePoint,
      setPointCoords: this.setPointCoords,
      updatePointsPosition: this.updatePointsPosition
    };

    return (
      <Context.Provider value={providerValue}>
        {this.props.children}
      </Context.Provider>
    )
  }
}